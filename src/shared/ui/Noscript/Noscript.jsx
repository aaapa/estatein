export function Noscript() {
  return (
    <noscript className="noscript">
      <style>{'body { overflow: hidden; }'}</style>
      <section className="noscript__content" aria-labelledby="noscript-title">
        <h2 className="noscript__title" id="noscript-title">
          JavaScript отключён
        </h2>
        <p className="noscript__description">
          Для работы Estatein включите JavaScript в настройках браузера и обновите страницу.
        </p>
      </section>
    </noscript>
  )
}
