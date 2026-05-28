import rawContent from './content.json'

export type NavLink = { href: string; label: string }
export type ProblemItem = { number: string; headline: string; body: string }
export type CaseStudy = { slug: string; client: string; tag: string; description: string; result: string; image: string }
export type Step = { number: string; title: string; description: string }
export type PricingPlan = { name: string; price: string; priceNote: string; description: string; features: string[]; cta: string; highlighted: boolean; badge?: string }
export type FaqItem = { q: string; a: string }

export type SiteContent = typeof rawContent
export const siteContent: SiteContent = rawContent

// Derived constant — WA link built from content
export function getWaLink(content: SiteContent): string {
  return `https://wa.me/${content.contact.waNumber}?text=${encodeURIComponent(content.contact.waMessage)}`
}
