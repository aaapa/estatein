import { createServer, defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { routes } from './src/shared/config/routes.js'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import packageJson from './package.json' with { type: 'json' }

const alias = { '@': fileURLToPath(new URL('./src', import.meta.url)) }
const preprocessorOptions = { scss: { additionalData: '@use "@/shared/lib/styles" as *;\n' } }
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

export default defineConfig(({ command, mode, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = command === 'build' || isPreview
  const siteUrl = (env.VITE_SITE_URL || (isProduction ? packageJson.homepage : '') || '').replace(/\/+$/, '')
  const site = siteUrl ? new URL(siteUrl) : null
  if (site && (site.protocol !== 'https:' || site.search || site.hash || site.username || site.password))
    throw new Error('VITE_SITE_URL должен содержать HTTPS-адрес сайта без параметров и якоря.')
  const base = isProduction && site ? `${site.pathname.replace(/\/+$/, '')}/` : '/'
  const define = { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl) }
  return {
    base,
    define,
    plugins: [
      react(),
      {
        name: 'estatein-seo',
        transformIndexHtml(html) {
          if (!siteUrl) return html
          return {
            html: html.replace(
              /(<meta\s+(?:property|name)="(?:og:image|twitter:image)"\s+content=")[^"]*/g,
              `$1${siteUrl}/site-preview.png`,
            ),
            tags: [
              {
                tag: 'link',
                attrs: { rel: 'canonical', href: `${siteUrl}/` },
                injectTo: 'head',
              },
              {
                tag: 'meta',
                attrs: { property: 'og:url', content: `${siteUrl}/` },
                injectTo: 'head',
              },
            ],
          }
        },
        async generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: siteUrl
              ? `User-agent: *\nAllow: /\nDisallow: /*?\n\nSitemap: ${siteUrl}/sitemap.xml\n`
              : 'User-agent: *\nDisallow: /\n',
          })
          if (siteUrl)
            this.emitFile({
              type: 'asset',
              fileName: 'sitemap.xml',
              source: (await readFile(new URL('./public/sitemap.xml', import.meta.url), 'utf8')).replaceAll(
                packageJson.homepage.replace(/\/+$/, ''),
                siteUrl,
              ),
            })
        },
      },
      {
        name: 'estatein-pages',
        apply: 'build',
        transformIndexHtml: {
          order: 'post',
          handler(html) {
            const script = html.match(/<script\b[^>]*\bsrc="[^"]*\/main\.js"[^>]*><\/script>/)?.[0]
            return script ? html.replace(script, '').replace('</body>', `</body>\n    ${script}`) : html
          },
        },
        async writeBundle(output) {
          const directory = resolve(output.dir)
          const server = await createServer({
            configFile: false,
            base,
            define,
            optimizeDeps: { noDiscovery: true, include: [] },
            oxc: { jsx: { runtime: 'automatic' } },
            resolve: { alias },
            css: { preprocessorOptions },
            server: { middlewareMode: true, hmr: false, preTransformRequests: false },
            appType: 'custom',
          })
          try {
            const { App } = await server.ssrLoadModule('/src/app/App.jsx')
            const { Noscript } = await server.ssrLoadModule('/src/shared/ui/Noscript/Noscript.jsx')
            const { getPageMeta } = await server.ssrLoadModule('/src/app/model/pageMeta.js')
            const html = (await readFile(resolve(directory, 'index.html'), 'utf8')).replace(
              /<noscript\b[\s\S]*?<\/noscript>/,
              renderToStaticMarkup(createElement(Noscript)),
            )
            for (const route of routes) {
              const markup = renderToString(
                createElement(
                  StaticRouter,
                  { basename: base, location: `${base}${route.slice(1)}` },
                  createElement(App),
                ),
              )
              const { title, description } = getPageMeta(route)
              let document = html
                .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
                .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
                .replace(/(<meta\s+(?:name|property)="(?:og:|twitter:)?title"\s+content=")[^"]*/g, `$1${escape(title)}`)
                .replace(
                  /(<meta\s+(?:name|property)="(?:og:|twitter:)?description"\s+content=")[^"]*/g,
                  `$1${escape(description)}`,
                )
              if (siteUrl) {
                document = document
                  .replace(/(<link rel="canonical" href=")[^"]*/, `$1${siteUrl}${route}`)
                  .replace(/(<meta property="og:url" content=")[^"]*/, `$1${siteUrl}${route}`)
              }
              const pageDirectory = resolve(directory, `.${route}`)
              await mkdir(pageDirectory, { recursive: true })
              await writeFile(resolve(pageDirectory, 'index.html'), document)
            }
            console.log(`Сохранены ${routes.length} страниц в HTML для поисковых систем.`)
          } finally {
            await server.close()
          }
        },
      },
    ],
    resolve: { alias },
    css: { preprocessorOptions },
    build: {
      cssCodeSplit: false,
      rolldownOptions: {
        output: {
          entryFileNames: 'assets/main.js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: (asset) =>
            asset.names.some((name) => name.endsWith('.css')) ? 'assets/main.css' : 'assets/[name][extname]',
        },
      },
    },
  }
})
