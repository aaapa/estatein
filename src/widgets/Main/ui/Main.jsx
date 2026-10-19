import './Main.scss'

export function Main({ children, headerHeight }) {
  return (
    <main className="main" style={{ paddingBlockStart: headerHeight }}>
      {children}
    </main>
  )
}
