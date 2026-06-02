import rawContent from './content.json'

export type SiteContent = typeof rawContent

export const siteContent: SiteContent = rawContent

export function getWaLink(content: SiteContent): string {
  return `https://wa.me/${content.contact.waNumber}?text=${encodeURIComponent(content.contact.waMessage)}`
}
