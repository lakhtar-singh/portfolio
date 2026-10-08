import { isClassicPath, switchDesign } from '../lib/designSwitch'

/** Button that flips between the light and dark designs. */
export default function DesignSwitch({ className = '', compact = false }) {
  const toDark = !isClassicPath()
  const label = toDark ? 'Dark design' : 'Light design'
  return (
    <button
      className={`design-switch ${className}`}
      onClick={(e) => switchDesign(e.currentTarget)}
      aria-label={`Switch to the ${toDark ? 'dark' : 'light'} design`}
      title={`Switch to the ${toDark ? 'dark' : 'light'} design`}
    >
      <span className="design-switch-icon" aria-hidden="true" />
      {!compact && <span className="design-switch-text">{label}</span>}
    </button>
  )
}
