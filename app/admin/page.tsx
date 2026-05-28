'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────
type Content = Record<string, unknown>
type Status = 'idle' | 'loading' | 'saving' | 'success' | 'error'

// ─── Helpers ─────────────────────────────────────────────────────────────────
function get(obj: unknown, path: string): unknown {
  return path.split('.').reduce((acc: unknown, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key]
    return undefined
  }, obj)
}

function set(obj: Content, path: string, value: unknown): Content {
  const keys = path.split('.')
  const result = JSON.parse(JSON.stringify(obj)) as Content
  let cursor: Record<string, unknown> = result as Record<string, unknown>
  for (let i = 0; i < keys.length - 1; i++) {
    cursor = cursor[keys[i]] as Record<string, unknown>
  }
  cursor[keys[keys.length - 1]] = value
  return result
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Field({
  label, path, value, onChange, multiline = false, isUrl = false,
}: {
  label: string
  path: string
  value: string
  onChange: (path: string, value: string) => void
  multiline?: boolean
  isUrl?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</label>
      {isUrl && (
        <div className="flex gap-2 items-center mb-1">
          {value && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="h-10 w-16 object-cover rounded border border-white/10" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }} />
          )}
          <span className="text-[10px] text-zinc-600">Preview immagine</span>
        </div>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          rows={3}
          className="bg-[#111] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white resize-y focus:outline-none focus:border-accent/50 transition-colors min-h-[72px]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          className="bg-[#111] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
        />
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#111] hover:bg-[#161616] transition-colors"
      >
        <span className="text-sm font-semibold text-white tracking-wide">{title}</span>
        <svg className={`text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="px-6 pb-6 pt-4 bg-[#0d0d0d] flex flex-col gap-5">{children}</div>}
    </div>
  )
}

// ─── Password gate ─────────────────────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: (pw: string) => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  const handleSubmit = async () => {
    const res = await fetch('/api/content', { headers: { 'x-admin-password': pw } })
    if (res.ok) {
      onAuth(pw)
    } else {
      setErr(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-white font-bold text-2xl mb-1">Yami<span className="text-[#C0392B]">Shots</span></p>
        <p className="text-zinc-500 text-sm mb-8">Admin — accesso contenuti</p>
        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Password admin"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(false) }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className={`bg-[#111] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors ${err ? 'border-red-500/60' : 'border-white/8 focus:border-accent/50'}`}
          />
          {err && <p className="text-red-400 text-xs">Password errata.</p>}
          <button
            onClick={handleSubmit}
            className="bg-accent hover:bg-[#E74C3C] text-white font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            Accedi
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Admin Page ──────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null)
  const [content, setContent] = useState<Content | null>(null)
  const [sha, setSha] = useState<string>('')
  const [status, setStatus] = useState<Status>('idle')
  const [dirty, setDirty] = useState(false)

  const loadContent = useCallback(async (pw: string) => {
    setStatus('loading')
    const res = await fetch('/api/content', { headers: { 'x-admin-password': pw } })
    if (res.ok) {
      const data = await res.json() as { content: Content; sha: string }
      setContent(data.content)
      setSha(data.sha)
      setStatus('idle')
    } else {
      setStatus('error')
    }
  }, [])

  const handleAuth = async (pw: string) => {
    setPassword(pw)
    await loadContent(pw)
  }

  const handleChange = (path: string, value: unknown) => {
    if (!content) return
    setContent(set(content, path, value))
    setDirty(true)
  }

  const handleArrayItemChange = (arrayPath: string, index: number, field: string, value: string) => {
    if (!content) return
    const arr = JSON.parse(JSON.stringify(get(content, arrayPath))) as Record<string, unknown>[]
    arr[index][field] = value
    setContent(set(content, arrayPath, arr))
    setDirty(true)
  }

  const handleSave = async () => {
    if (!content || !password) return
    setStatus('saving')
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ content, sha }),
    })
    if (res.ok) {
      setStatus('success')
      setDirty(false)
      setTimeout(() => setStatus('idle'), 3000)
      // Reload to get new sha
      await loadContent(password)
    } else {
      setStatus('error')
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty) { e.preventDefault() }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [dirty])

  if (!password) return <PasswordGate onAuth={handleAuth} />

  if (status === 'loading' || !content) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-zinc-500 text-sm animate-pulse">Caricamento contenuti...</div>
      </div>
    )
  }

  const c = content as {
    contact: { waNumber: string; waMessage: string }
    meta: { title: string; description: string; ogTitle: string; ogDescription: string }
    nav: { cta: string; ctaMobile: string; links: { href: string; label: string }[] }
    hero: { eyebrow: string; headline: string; headlineFaded: string; subtext: string; cta1: string; cta2: string; bgImage: string; socialProof: string[] }
    problems: { eyebrow: string; title: string; items: { number: string; headline: string; body: string }[] }
    costs: { eyebrow: string; title: string; body1Bold: string; body1Muted: string; body2: string; body3: string; body3Emphasis: string; body3Suffix: string; consequences: string[] }
    caseStudies: { eyebrow: string; title: string; cases: { slug: string; client: string; tag: string; description: string; result: string; image: string }[] }
    method: { eyebrow: string; title: string; subtitle: string; steps: { number: string; title: string; description: string }[] }
    pricing: { eyebrow: string; title: string; note: string; plans: { name: string; price: string; priceNote: string; description: string; features: string[]; cta: string; highlighted: boolean; badge?: string }[] }
    faq: { eyebrow: string; title: string; items: { q: string; a: string }[] }
    finalCta: { title: string; titleFaded: string; subtext: string; cta: string; bgImage: string }
    footer: { tagline: string; copyright: string; waLabel: string }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">Yami<span className="text-[#C0392B]">Shots</span></span>
          <span className="text-zinc-600 text-xs">/ admin</span>
          {dirty && <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Modifiche non salvate</span>}
        </div>
        <div className="flex items-center gap-3">
          {status === 'success' && (
            <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-lg">
              ✓ Salvato · Deploy in corso (~30s)
            </span>
          )}
          {status === 'error' && (
            <span className="text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg">Errore nel salvataggio</span>
          )}
          <a href="/" target="_blank" className="text-zinc-500 hover:text-white text-xs transition-colors">
            Vedi sito ↗
          </a>
          <button
            onClick={handleSave}
            disabled={status === 'saving' || !dirty}
            className="bg-accent hover:bg-[#E74C3C] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            {status === 'saving' ? 'Salvo...' : 'Salva & Deploy'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-4">

        {/* Contact */}
        <Section title="Contatto WhatsApp">
          <Field label="Numero WA (con prefisso internazionale, senza +)" path="contact.waNumber" value={c.contact.waNumber} onChange={handleChange} />
          <Field label="Messaggio pre-compilato" path="contact.waMessage" value={c.contact.waMessage} onChange={handleChange} multiline />
        </Section>

        {/* Meta */}
        <Section title="SEO / Meta">
          <Field label="Titolo pagina" path="meta.title" value={c.meta.title} onChange={handleChange} />
          <Field label="Descrizione" path="meta.description" value={c.meta.description} onChange={handleChange} multiline />
          <Field label="OG Title" path="meta.ogTitle" value={c.meta.ogTitle} onChange={handleChange} />
          <Field label="OG Description" path="meta.ogDescription" value={c.meta.ogDescription} onChange={handleChange} multiline />
        </Section>

        {/* Nav */}
        <Section title="Navigazione">
          <Field label="CTA desktop" path="nav.cta" value={c.nav.cta} onChange={handleChange} />
          <Field label="CTA mobile" path="nav.ctaMobile" value={c.nav.ctaMobile} onChange={handleChange} />
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Link navigazione</p>
            <div className="flex flex-col gap-3">
              {c.nav.links.map((link, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <Field label={`Link ${i + 1} — anchor`} path={`nav.links.${i}.href`} value={link.href} onChange={handleChange} />
                  <Field label={`Link ${i + 1} — etichetta`} path={`nav.links.${i}.label`} value={link.label} onChange={handleChange} />
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Hero */}
        <Section title="Hero">
          <Field label="Immagine di sfondo (URL o percorso /images/...)" path="hero.bgImage" value={c.hero.bgImage} onChange={handleChange} isUrl />
          <Field label="Eyebrow (sotto il logo)" path="hero.eyebrow" value={c.hero.eyebrow} onChange={handleChange} />
          <Field label="Headline principale" path="hero.headline" value={c.hero.headline} onChange={handleChange} />
          <Field label="Headline sfumata" path="hero.headlineFaded" value={c.hero.headlineFaded} onChange={handleChange} />
          <Field label="Sottotitolo" path="hero.subtext" value={c.hero.subtext} onChange={handleChange} multiline />
          <Field label="CTA primaria" path="hero.cta1" value={c.hero.cta1} onChange={handleChange} />
          <Field label="CTA secondaria" path="hero.cta2" value={c.hero.cta2} onChange={handleChange} />
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Social proof (nomi clienti)</p>
            <div className="flex flex-col gap-2">
              {c.hero.socialProof.map((name, i) => (
                <input
                  key={i}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    const arr = [...c.hero.socialProof]
                    arr[i] = e.target.value
                    handleChange('hero.socialProof', arr)
                  }}
                  className="bg-[#111] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                />
              ))}
            </div>
          </div>
        </Section>

        {/* Problems */}
        <Section title="Sezione Problemi">
          <Field label="Eyebrow" path="problems.eyebrow" value={c.problems.eyebrow} onChange={handleChange} />
          <Field label="Titolo" path="problems.title" value={c.problems.title} onChange={handleChange} />
          {c.problems.items.map((item, i) => (
            <div key={i} className="border border-white/5 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-xs text-zinc-600">Card {item.number}</p>
              <Field label="Headline" path="" value={item.headline} onChange={(_, v) => handleArrayItemChange('problems.items', i, 'headline', v)} />
              <Field label="Testo" path="" value={item.body} onChange={(_, v) => handleArrayItemChange('problems.items', i, 'body', v)} multiline />
            </div>
          ))}
        </Section>

        {/* Costs */}
        <Section title="Sezione Costi">
          <Field label="Eyebrow" path="costs.eyebrow" value={c.costs.eyebrow} onChange={handleChange} />
          <Field label="Titolo" path="costs.title" value={c.costs.title} onChange={handleChange} />
          <Field label="Paragrafo 1 (grassetto)" path="costs.body1Bold" value={c.costs.body1Bold} onChange={handleChange} />
          <Field label="Paragrafo 1 (sfumato)" path="costs.body1Muted" value={c.costs.body1Muted} onChange={handleChange} />
          <Field label="Paragrafo 2" path="costs.body2" value={c.costs.body2} onChange={handleChange} multiline />
          <Field label="Paragrafo 3" path="costs.body3" value={c.costs.body3} onChange={handleChange} multiline />
          <Field label="Paragrafo 3 — enfasi" path="costs.body3Emphasis" value={c.costs.body3Emphasis} onChange={handleChange} />
          <Field label="Paragrafo 3 — conclusione" path="costs.body3Suffix" value={c.costs.body3Suffix} onChange={handleChange} />
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Conseguenze (lista)</p>
            {c.costs.consequences.map((item, i) => (
              <input
                key={i}
                type="text"
                value={item}
                onChange={(e) => {
                  const arr = [...c.costs.consequences]
                  arr[i] = e.target.value
                  handleChange('costs.consequences', arr)
                }}
                className="bg-[#111] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors w-full mb-2"
              />
            ))}
          </div>
        </Section>

        {/* Case Studies */}
        <Section title="Case Studies">
          <Field label="Eyebrow" path="caseStudies.eyebrow" value={c.caseStudies.eyebrow} onChange={handleChange} />
          <Field label="Titolo" path="caseStudies.title" value={c.caseStudies.title} onChange={handleChange} />
          {c.caseStudies.cases.map((cs, i) => (
            <div key={i} className="border border-white/5 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-xs text-zinc-500 font-semibold">{cs.client}</p>
              <Field label="Immagine (URL o /images/...)" path="" value={cs.image} onChange={(_, v) => handleArrayItemChange('caseStudies.cases', i, 'image', v)} isUrl />
              <Field label="Tag" path="" value={cs.tag} onChange={(_, v) => handleArrayItemChange('caseStudies.cases', i, 'tag', v)} />
              <Field label="Descrizione" path="" value={cs.description} onChange={(_, v) => handleArrayItemChange('caseStudies.cases', i, 'description', v)} multiline />
              <Field label="Risultato" path="" value={cs.result} onChange={(_, v) => handleArrayItemChange('caseStudies.cases', i, 'result', v)} />
            </div>
          ))}
        </Section>

        {/* Method */}
        <Section title="Metodo (3 Step)">
          <Field label="Eyebrow" path="method.eyebrow" value={c.method.eyebrow} onChange={handleChange} />
          <Field label="Titolo" path="method.title" value={c.method.title} onChange={handleChange} />
          <Field label="Sottotitolo" path="method.subtitle" value={c.method.subtitle} onChange={handleChange} />
          {c.method.steps.map((step, i) => (
            <div key={i} className="border border-white/5 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-xs text-zinc-600">Step {step.number}</p>
              <Field label="Titolo" path="" value={step.title} onChange={(_, v) => handleArrayItemChange('method.steps', i, 'title', v)} />
              <Field label="Descrizione" path="" value={step.description} onChange={(_, v) => handleArrayItemChange('method.steps', i, 'description', v)} multiline />
            </div>
          ))}
        </Section>

        {/* Pricing */}
        <Section title="Prezzi">
          <Field label="Eyebrow" path="pricing.eyebrow" value={c.pricing.eyebrow} onChange={handleChange} />
          <Field label="Titolo" path="pricing.title" value={c.pricing.title} onChange={handleChange} />
          <Field label="Nota" path="pricing.note" value={c.pricing.note} onChange={handleChange} multiline />
          {c.pricing.plans.map((plan, i) => (
            <div key={i} className={`border rounded-xl p-4 flex flex-col gap-3 ${plan.highlighted ? 'border-accent/20' : 'border-white/5'}`}>
              <div className="flex items-center gap-2">
                <p className="text-xs text-zinc-500 font-semibold">{plan.name}</p>
                {plan.highlighted && <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-full">In evidenza</span>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Prezzo" path="" value={plan.price} onChange={(_, v) => handleArrayItemChange('pricing.plans', i, 'price', v)} />
                <Field label="Nota prezzo" path="" value={plan.priceNote} onChange={(_, v) => handleArrayItemChange('pricing.plans', i, 'priceNote', v)} />
              </div>
              <Field label="Descrizione" path="" value={plan.description} onChange={(_, v) => handleArrayItemChange('pricing.plans', i, 'description', v)} multiline />
              <Field label="CTA" path="" value={plan.cta} onChange={(_, v) => handleArrayItemChange('pricing.plans', i, 'cta', v)} />
              {plan.badge !== undefined && (
                <Field label="Badge" path="" value={plan.badge ?? ''} onChange={(_, v) => handleArrayItemChange('pricing.plans', i, 'badge', v)} />
              )}
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Features</p>
                {plan.features.map((feat, fi) => (
                  <input
                    key={fi}
                    type="text"
                    value={feat}
                    onChange={(e) => {
                      const plans = JSON.parse(JSON.stringify(c.pricing.plans)) as typeof c.pricing.plans
                      plans[i].features[fi] = e.target.value
                      handleChange('pricing.plans', plans)
                    }}
                    className="bg-[#111] border border-white/8 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors w-full mb-2"
                  />
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* FAQ */}
        <Section title="FAQ">
          <Field label="Eyebrow" path="faq.eyebrow" value={c.faq.eyebrow} onChange={handleChange} />
          <Field label="Titolo" path="faq.title" value={c.faq.title} onChange={handleChange} />
          {c.faq.items.map((item, i) => (
            <div key={i} className="border border-white/5 rounded-xl p-4 flex flex-col gap-3">
              <Field label={`Domanda ${i + 1}`} path="" value={item.q} onChange={(_, v) => handleArrayItemChange('faq.items', i, 'q', v)} />
              <Field label="Risposta" path="" value={item.a} onChange={(_, v) => handleArrayItemChange('faq.items', i, 'a', v)} multiline />
            </div>
          ))}
        </Section>

        {/* Final CTA */}
        <Section title="CTA Finale">
          <Field label="Immagine di sfondo" path="finalCta.bgImage" value={c.finalCta.bgImage} onChange={handleChange} isUrl />
          <Field label="Headline (riga 1)" path="finalCta.title" value={c.finalCta.title} onChange={handleChange} />
          <Field label="Headline (riga 2, sfumata)" path="finalCta.titleFaded" value={c.finalCta.titleFaded} onChange={handleChange} />
          <Field label="Sottotesto" path="finalCta.subtext" value={c.finalCta.subtext} onChange={handleChange} multiline />
          <Field label="CTA" path="finalCta.cta" value={c.finalCta.cta} onChange={handleChange} />
        </Section>

        {/* Footer */}
        <Section title="Footer">
          <Field label="Tagline" path="footer.tagline" value={c.footer.tagline} onChange={handleChange} />
          <Field label="Copyright" path="footer.copyright" value={c.footer.copyright} onChange={handleChange} />
          <Field label="Etichetta WhatsApp" path="footer.waLabel" value={c.footer.waLabel} onChange={handleChange} />
        </Section>

        {/* Bottom save */}
        <div className="flex justify-end pt-4 pb-10">
          <button
            onClick={handleSave}
            disabled={status === 'saving' || !dirty}
            className="bg-accent hover:bg-[#E74C3C] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors"
          >
            {status === 'saving' ? 'Salvo...' : 'Salva & Deploy'}
          </button>
        </div>
      </div>
    </div>
  )
}
