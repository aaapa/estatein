import SimpleBarCore from 'simplebar-core'

export class ScrollBar extends SimpleBarCore {
  toggleTrackVisibility(axis) {
    super.toggleTrackVisibility(axis)
    this.el.classList.remove(`${this.classNames.scrollable}-${axis}`)
  }
}
