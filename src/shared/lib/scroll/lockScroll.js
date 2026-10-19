let locks = 0
let wasLocked = false

export function lockScroll() {
  if (locks === 0) wasLocked = document.body.classList.contains('scroll-lock')
  locks++
  document.body.classList.add('scroll-lock')
  let released = false
  return () => {
    if (released) return
    released = true
    locks--
    if (locks === 0 && !wasLocked) document.body.classList.remove('scroll-lock')
  }
}
