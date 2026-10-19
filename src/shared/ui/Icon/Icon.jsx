import { getAssetPath } from '@/shared/lib/dom/getAssetPath'

export function Icon({ className, name, width = 24, height = 24 }) {
  return (
    <svg className={className} width={width} height={height} fill="none" aria-hidden="true" focusable="false">
      <use href={getAssetPath(`/icons/sprite.svg#icon-${name}`)} width="100%" height="100%" />
    </svg>
  )
}
