'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── Config ──────────────────────────────────────────────────────────────────
const GITHUB_OWNER = 'YamiShots'
const GITHUB_REPO  = 'yamishots-landing'
const CONTENT_PATH = 'app/lib/content.json'

// ─── Types ───────────────────────────────────────────────────────────────────
type Content = Record<string, unknown>
type Status  = 'idle' | 'loading' | 'saving' | 'success' | 'error'

// ─── GitHub helpers (client-side, no server needed) ──────────────────────────
async function ghGet(pat: string) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github+json',
    },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`GitHub GET ${res.status}`)
  const data = await res.json()
  const decoded = atob(data.content.replace(/\n/g, ''))
  return { content: JSON.parse(decoded) as Content, sha: data.sha as string }
}

async function ghPut(pat: string, content: Content, sha: string) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}`
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))))
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'chore: update site content via admin panel',
      content: encoded,
      sha,
    }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(JSON.stringify(err))
  }
}

// ─── Path helpers ─────────────────────────────────────────────────────────────
function setPath(obj: Content, path: string, value: unknown): Content {
  const keys  = path.split('.')
  const result = JSON.parse(JSON.stringify(obj)) as Content
  let cursor: Record<string, unknown> = result as Record<string, unknown>
  for (let i = 0; i < keys.length - 1; i++) {
    cursor = cursor[keys[i]] as Record<string, unknown>
  }
  cursor[keys[keys.length - 1]] = value
  return result
}

// ─── UI Components ────────────────────────────────────────────────────────────
function Field({
  label, value, onChange, multiline = false, isUrl = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  isUrl?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</label>
      {isUrl && value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="preview" className="h-10 w-16 object-cover rounded border border-white/10 mb-1" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }} />
      )}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
          className="bg-[#111] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white resize-y focus:outline-none focus:border-[#C0392B]/50 transition-colors min-h-[72px]" />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="bg-[#111] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C0392B]/50 transition-colors" />
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 bg-[#111] hover:bg-[#161616] transition-colors">
        <span className="text-sm font-semibold text-white tracking-wide">{title}</span>
        <svg className={`text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && <div className="px-6 pb-6 pt-4 bg-[#0d0d0d] flex flex-col gap-5">{children}</div>}
    </div>
  )
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginGate({ onAuth }: { onAuth: (pat: string) => void }) {
  const [pat, setPat]   = useState('')
  const [err, setErr]   = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async () => {
    if (!pat.trim()) return
    setBusy(true)
    setErr('')
    try {
      await ghGet(pat.trim()) // verifica che il token funzioni
      sessionStorage.setItem('ys_pat', pat.trim())
      onAuth(pat.trim())
    } catch {
      setErr('Token non valido o senza accesso al repo. Verifica che abbia scope "repo".')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-white font-bold text-2xl mb-1">Yami<span className="text-[#C0392B]">Shots</span></p>
        <p className="text-zinc-500 text-sm mb-8">Admin — inserisci il tuo GitHub PAT</p>
        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="ghp_xxxxxxxxxxxxxxxx"
            value={pat}
            onChange={(e) => { setPat(e.target.value); setErr('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className={`bg-[#111] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors font-mono ${err ? 'border-red-500/60' : 'border-white/8 focus:border-[#C0392B]/50'}`}
          />
          {err && <p className="text-red-400 text-xs leading-relaxed">{err}</p>}
          <button onClick={handleSubmit} disabled={busy || !pat.trim()}
            className="bg-[#C0392B] hover:bg-[#E74C3C] disabled:opacity-40 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            {busy ? 'Verifica...' : 'Accedi'}
          </button>
          <p className="text-zinc-700 text-xs text-center mt-1">
            Il token viene salvato solo in sessionStorage — sparisce alla chiusura del browser.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [pat,     setPat]     = useState<string | null>(null)
  const [content, setContent] = useState<Content | null>(null)
  const [sha,     setSha]     = useState('')
  const [status,  setStatus]  = useState<Status>('idle')
  const [dirty,   setDirty]   = useState(false)

  // Ripristina sessione
  useEffect(() => {
    const saved = sessionStorage.getItem('ys_pat')
    if (saved) setPat(saved)
  }, [])

  const loadContent = useCallback(async (token: string) => {
    setStatus('loading')
    try {
      const { content, sha } = await ghGet(token)
      setContent(content)
      setSha(sha)
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    if (pat) loadContent(pat)
  }, [pat, loadContent])

  const handleAuth = (token: string) => setPat(token)

  const handleChange = (path: string, value: unknown) => {
    if (!content) return
    setContent(setPath(content, path, value))
    setDirty(true)
  }

  const handleArrayItem = (arrayPath: string, index: number, field: string, value: string) => {
    if (!content) return
    const arr = JSON.parse(JSON.stringify(
      arrayPath.split('.').reduce((a: unknown, k) => (a as Record<string,unknown>)[k], content)
    )) as Record<string, unknown>[]
    arr[index][field] = value
    handleChange(arrayPath, arr)
  }

  const handleSave = async () => {
    if (!content || !pat) return
    setStatus('saving')
    try {
      await ghPut(pat, content, sha)
      setStatus('success')
      setDirty(false)
      setTimeout(() => setStatus('idle'), 4000)
      await loadContent(pat)
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    const fn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault() }
    window.addEventListener('beforeunload', fn)
    return () => window.removeEventListener('beforeunload', fn)
  }, [dirty])

  if (!pat) return <LoginGate onAuth={handleAuth} />

  if (status === 'loading' || !content) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-zinc-500 text-sm animate-pulse">Caricamento contenuti da GitHub...</div>
      </div>
    )
  }

  if (status === 'error' && !content) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center flex-col gap-4">
        <p className="text-red-400 text-sm">Errore nel caricamento.</p>
        <button onClick={() => { sessionStorage.removeItem('ys_pat'); setPat(null) }} className="text-zinc-500 text-xs underline">Riprova con un altro token</button>
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
          {status === 'success' && <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-lg">✓ Salvato · Deploy in corso (~30s)</span>}
          {status === 'error'   && <span className="text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg">Errore nel salvataggio</span>}
          <a href="/" target="_blank" className="text-zinc-500 hover:text-white text-xs transition-colors">Vedi sito ↗</a>
          <button onClick={handleSave} disabled={status === 'saving' || !dirty}
            className="bg-[#C0392B] hover:bg-[#E74C3C] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
            {status === 'saving' ? 'Salvo...' : 'Salva & Deploy'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-4">

        <Section title="Contatto WhatsApp">
          <Field label="Numero WA (con prefisso, senza +)" value={c.contact.waNumber} onChange={(v) => handleChange('contact.waNumber', v)} />
          <Field label="Messaggio pre-compilato" value={c.contact.waMessage} onChange={(v) => handleChange('contact.waMessage', v)} multiline />
        </Section>

        <Section title="SEO / Meta">
          <Field label="Titolo pagina" value={c.meta.title} onChange={(v) => handleChange('meta.title', v)} />
          <Field label="Descrizione" value={c.meta.description} onChange={(v) => handleChange('meta.description', v)} multiline />
          <Field label="OG Title" value={c.meta.ogTitle} onChange={(v) => handleChange('meta.ogTitle', v)} />
          <Field label="OG Description" value={c.meta.ogDescription} onChange={(v) => handleChange('meta.ogDescription', v)} multiline />
        </Section>

        <Section title="Navigazione">
          <Field label="CTA desktop" value={c.nav.cta} onChange={(v) => handleChange('nav.cta', v)} />
          <Field label="CTA mobile" value={c.nav.ctaMobile} onChange={(v) => handleChange('nav.ctaMobile', v)} />
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Link navigazione</p>
            <div className="flex flex-col gap-3">
              {c.nav.links.map((link, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <Field label={`Link ${i + 1} — anchor`} value={link.href} onChange={(v) => handleArrayItem('nav.links', i, 'href', v)} />
                  <Field label={`Link ${i + 1} — etichetta`} value={link.label} onChange={(v) => handleArrayItem('nav.links', i, 'label', v)} />
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Hero">
          <Field label="Immagine di sfondo (URL o /images/...)" value={c.hero.bgImage} onChange={(v) => handleChange('hero.bgImage', v)} isUrl />
          <Field label="Eyebrow" value={c.hero.eyebrow} onChange={(v) => handleChange('hero.eyebrow', v)} />
          <Field label="Headline principale" value={c.hero.headline} onChange={(v) => handleChange('hero.headline', v)} />
          <Field label="Headline sfumata" value={c.hero.headlineFaded} onChange={(v) => handleChange('hero.headlineFaded', v)} />
          <Field label="Sottotitolo" value={c.hero.subtext} onChange={(v) => handleChange('hero.subtext', v)} multiline />
          <Field label="CTA primaria" value={c.hero.cta1} onChange={(v) => handleChange('hero.cta1', v)} />
          <Field label="CTA secondaria" value={c.hero.cta2} onChange={(v) => handleChange('hero.cta2', v)} />
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Social proof (nomi clienti)</p>
            <div className="flex flex-col gap-2">
              {c.hero.socialProof.map((name, i) => (
                <input key={i} type="text" value={name}
                  onChange={(e) => { const arr = [...c.hero.socialProof]; arr[i] = e.target.value; handleChange('hero.socialProof', arr) }}
                  className="bg-[#111] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C0392B]/50 transition-colors" />
              ))}
            </div>
          </div>
        </Section>

        <Section title="Sezione Problemi">
          <Field label="Eyebrow" value={c.problems.eyebrow} onChange={(v) => handleChange('problems.eyebrow', v)} />
          <Field label="Titolo" value={c.problems.title} onChange={(v) => handleChange('problems.title', v)} />
          {c.problems.items.map((item, i) => (
            <div key={i} className="border border-white/5 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-xs text-zinc-600">Card {item.number}</p>
              <Field label="Headline" value={item.headline} onChange={(v) => handleArrayItem('problems.items', i, 'headline', v)} />
              <Field label="Testo" value={item.body} onChange={(v) => handleArrayItem('problems.items', i, 'body', v)} multiline />
            </div>
          ))}
        </Section>

        <Section title="Sezione Costi">
          <Field label="Eyebrow" value={c.costs.eyebrow} onChange={(v) => handleChange('costs.eyebrow', v)} />
          <Field label="Titolo" value={c.costs.title} onChange={(v) => handleChange('costs.title', v)} />
          <Field label="Paragrafo 1 (grassetto)" value={c.costs.body1Bold} onChange={(v) => handleChange('costs.body1Bold', v)} />
          <Field label="Paragrafo 1 (sfumato)" value={c.costs.body1Muted} onChange={(v) => handleChange('costs.body1Muted', v)} />
          <Field label="Paragrafo 2" value={c.costs.body2} onChange={(v) => handleChange('costs.body2', v)} multiline />
          <Field label="Paragrafo 3" value={c.costs.body3} onChange={(v) => handleChange('costs.body3', v)} multiline />
          <Field label="Paragrafo 3 — enfasi" value={c.costs.body3Emphasis} onChange={(v) => handleChange('costs.body3Emphasis', v)} />
          <Field label="Paragrafo 3 — conclusione" value={c.costs.body3Suffix} onChange={(v) => handleChange('costs.body3Suffix', v)} />
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Conseguenze (lista)</p>
            {c.costs.consequences.map((item, i) => (
              <input key={i} type="text" value={item}
                onChange={(e) => { const arr = [...c.costs.consequences]; arr[i] = e.target.value; handleChange('costs.consequences', arr) }}
                className="bg-[#111] border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C0392B]/50 transition-colors w-full mb-2" />
            ))}
          </div>
        </Section>

        <Section title="Case Studies">
          <Field label="Eyebrow" value={c.caseStudies.eyebrow} onChange={(v) => handleChange('caseStudies.eyebrow', v)} />
          <Field label="Titolo" value={c.caseStudies.title} onChange={(v) => handleChange('caseStudies.title', v)} />
          {c.caseStudies.cases.map((cs, i) => (
            <div key={i} className="border border-white/5 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-xs text-zinc-500 font-semibold">{cs.client}</p>
              <Field label="Immagine (URL o /images/...)" value={cs.image} onChange={(v) => handleArrayItem('caseStudies.cases', i, 'image', v)} isUrl />
              <Field label="Tag" value={cs.tag} onChange={(v) => handleArrayItem('caseStudies.cases', i, 'tag', v)} />
              <Field label="Descrizione" value={cs.description} onChange={(v) => handleArrayItem('caseStudies.cases', i, 'description', v)} multiline />
              <Field label="Risultato" value={cs.result} onChange={(v) => handleArrayItem('caseStudies.cases', i, 'result', v)} />
            </div>
          ))}
        </Section>

        <Section title="Metodo (3 Step)">
          <Field label="Eyebrow" value={c.method.eyebrow} onChange={(v) => handleChange('method.eyebrow', v)} />
          <Field label="Titolo" value={c.method.title} onChange={(v) => handleChange('method.title', v)} />
          <Field label="Sottotitolo" value={c.method.subtitle} onChange={(v) => handleChange('method.subtitle', v)} />
          {c.method.steps.map((step, i) => (
            <div key={i} className="border border-white/5 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-xs text-zinc-600">Step {step.number}</p>
              <Field label="Titolo" value={step.title} onChange={(v) => handleArrayItem('method.steps', i, 'title', v)} />
              <Field label="Descrizione" value={step.description} onChange={(v) => handleArrayItem('method.steps', i, 'description', v)} multiline />
            </div>
          ))}
        </Section>

        <Section title="Prezzi">
          <Field label="Eyebrow" value={c.pricing.eyebrow} onChange={(v) => handleChange('pricing.eyebrow', v)} />
          <Field label="Titolo" value={c.pricing.title} onChange={(v) => handleChange('pricing.title', v)} />
          <Field label="Nota" value={c.pricing.note} onChange={(v) => handleChange('pricing.note', v)} multiline />
          {c.pricing.plans.map((plan, i) => (
            <div key={i} className={`border rounded-xl p-4 flex flex-col gap-3 ${plan.highlighted ? 'border-[#C0392B]/20' : 'border-white/5'}`}>
              <div className="flex items-center gap-2">
                <p className="text-xs text-zinc-500 font-semibold">{plan.name}</p>
                {plan.highlighted && <span className="text-[10px] text-[#C0392B] bg-[#C0392B]/10 px-2 py-0.5 rounded-full">In evidenza</span>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Prezzo" value={plan.price} onChange={(v) => handleArrayItem('pricing.plans', i, 'price', v)} />
                <Field label="Nota prezzo" value={plan.priceNote} onChange={(v) => handleArrayItem('pricing.plans', i, 'priceNote', v)} />
              </div>
              <Field label="Descrizione" value={plan.description} onChange={(v) => handleArrayItem('pricing.plans', i, 'description', v)} multiline />
              <Field label="CTA" value={plan.cta} onChange={(v) => handleArrayItem('pricing.plans', i, 'cta', v)} />
              {plan.badge !== undefined && (
                <Field label="Badge" value={plan.badge ?? ''} onChange={(v) => handleArrayItem('pricing.plans', i, 'badge', v)} />
              )}
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Features</p>
                {plan.features.map((feat, fi) => (
                  <input key={fi} type="text" value={feat}
                    onChange={(e) => {
                      const plans = JSON.parse(JSON.stringify(c.pricing.plans)) as typeof c.pricing.plans
                      plans[i].features[fi] = e.target.value
                      handleChange('pricing.plans', plans)
                    }}
                    className="bg-[#111] border border-white/8 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C0392B]/50 transition-colors w-full mb-2" />
                ))}
              </div>
            </div>
          ))}
        </Section>

        <Section title="FAQ">
          <Field label="Eyebrow" value={c.faq.eyebrow} onChange={(v) => handleChange('faq.eyebrow', v)} />
          <Field label="Titolo" value={c.faq.title} onChange={(v) => handleChange('faq.title', v)} />
          {c.faq.items.map((item, i) => (
            <div key={i} className="border border-white/5 rounded-xl p-4 flex flex-col gap-3">
              <Field label={`Domanda ${i + 1}`} value={item.q} onChange={(v) => handleArrayItem('faq.items', i, 'q', v)} />
              <Field label="Risposta" value={item.a} onChange={(v) => handleArrayItem('faq.items', i, 'a', v)} multiline />
            </div>
          ))}
        </Section>

        <Section title="CTA Finale">
          <Field label="Immagine di sfondo" value={c.finalCta.bgImage} onChange={(v) => handleChange('finalCta.bgImage', v)} isUrl />
          <Field label="Headline riga 1" value={c.finalCta.title} onChange={(v) => handleChange('finalCta.title', v)} />
          <Field label="Headline riga 2 (sfumata)" value={c.finalCta.titleFaded} onChange={(v) => handleChange('finalCta.titleFaded', v)} />
          <Field label="Sottotesto" value={c.finalCta.subtext} onChange={(v) => handleChange('finalCta.subtext', v)} multiline />
          <Field label="CTA" value={c.finalCta.cta} onChange={(v) => handleChange('finalCta.cta', v)} />
        </Section>

        <Section title="Footer">
          <Field label="Tagline" value={c.footer.tagline} onChange={(v) => handleChange('footer.tagline', v)} />
          <Field label="Copyright" value={c.footer.copyright} onChange={(v) => handleChange('footer.copyright', v)} />
          <Field label="Etichetta WhatsApp" value={c.footer.waLabel} onChange={(v) => handleChange('footer.waLabel', v)} />
        </Section>

        <div className="flex justify-end pt-4 pb-10">
          <button onClick={handleSave} disabled={status === 'saving' || !dirty}
            className="bg-[#C0392B] hover:bg-[#E74C3C] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors">
            {status === 'saving' ? 'Salvo...' : 'Salva & Deploy'}
          </button>
        </div>
      </div>
    </div>
  )
}
