import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const CONTENT_FILE_PATH = 'app/lib/content.json'

function getConfig() {
  return {
    owner: process.env.GITHUB_OWNER ?? 'YamiShots',
    repo:  process.env.GITHUB_REPO  ?? 'yamishots-landing',
    pat:   process.env.GITHUB_PAT   ?? '',
    adminPassword: process.env.ADMIN_PASSWORD ?? '',
  }
}

function githubHeaders(pat: string) {
  return {
    Authorization: `Bearer ${pat}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
}

export async function GET() {
  const { pat, owner, repo } = getConfig()

  // DEBUG TEMPORANEO — rimuovere dopo aver verificato
  return NextResponse.json({
    pat_defined: typeof process.env.GITHUB_PAT !== 'undefined',
    pat_length: pat.length,
    pat_preview: pat.slice(0, 6),
    owner,
    repo,
  })
}

export async function PUT(request: Request) {
  const { owner, repo, pat, adminPassword } = getConfig()

  if (!pat) {
    return NextResponse.json({ error: 'GITHUB_PAT not configured' }, { status: 500 })
  }

  const authHeader = request.headers.get('x-admin-password')
  if (!adminPassword || authHeader !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { content, sha } = body

  if (!content || !sha) {
    return NextResponse.json({ error: 'Missing content or sha' }, { status: 400 })
  }

  const encoded = Buffer.from(JSON.stringify(content, null, 2)).toString('base64')
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${CONTENT_FILE_PATH}`

  const res = await fetch(url, {
    method: 'PUT',
    headers: githubHeaders(pat),
    body: JSON.stringify({
      message: 'chore: update site content via admin panel',
      content: encoded,
      sha,
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: 'GitHub commit failed', detail: err }, { status: res.status })
  }

  return NextResponse.json({ success: true })
}
