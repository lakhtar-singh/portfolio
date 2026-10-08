export const toast = (message) => window.dispatchEvent(new CustomEvent('toast', { detail: message }))
export const openProject = (id) => window.dispatchEvent(new CustomEvent('open-project', { detail: id }))
export const openPalette = () => window.dispatchEvent(new CustomEvent('open-palette'))

export async function copyText(text, label = 'Copied') {
  try {
    await navigator.clipboard.writeText(text)
    toast(label)
  } catch {
    toast(`Copy this: ${text}`)
  }
}
