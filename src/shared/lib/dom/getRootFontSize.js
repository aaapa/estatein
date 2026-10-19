export function getRootFontSize() {
  if (typeof window === 'undefined') return 16
  const fontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize)
  return Number.isFinite(fontSize) && fontSize > 0 ? fontSize : 16
}
