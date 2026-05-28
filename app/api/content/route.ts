import { NextResponse } from 'next/server'

const GITHUB_OWNER = process.env.GITHUB_OWNER ?? 'YamiShots'
const GITHUB_REPO = process.env.GITHUB_REPO ?? 'yamishots-landing'
const GITHUB_PAT = process.env.GITHUB_PAT ?? ''
const CONTENT_FILE_PATH = 'app/lib/content.json'

const githubHeaders = {
  Authorization: `Bearer ${GITHUB_PAT}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
}

// GET — fetch current content.json from GitHub
export async function GET() {
  if (!GITHUB_PAT) {
    return NextResponse.json({ error: 'GITHUB_PAT not configured' }, { status: 500 })
  }

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_FILE_PATH}`
  const res = await fetch(url, { headers: githubHeaders, cache: 'no-store' })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch from GitHub' }, { status: res.status })
  }

  const data = await res.json()
  const decoded = Buffer.from(data.content, 'base64').toString('utf-8')

  return NextResponse.json({
    content: JSON.parse(decoded),
    sha: data.sha, // needed to update the file
  })
}

// PUT — commit updated content.json to GitHub → triggers Vercel redeploy
export async function PUT(request: Request) {
  if (!GITHUB_PAT) {
    return NextResponse.json({ error: 'GITHUB_PAT not configured' }, { status: 500 })
  }

  // Verify admin password
  const authHeader = request.headers.get('x-admin-password')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { content, sha } = body

  if (!content || !sha) {
    return NextResponse.json({ error: 'Missing content or sha' }, { status: 400 })
  }

  const encoded = Buffer.from(JSON.stringify(content, null, 2)).toString('base64')
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_FILE_PATH}`

  const res = await fetch(url, {
    method: 'PUT',
    headers: githubHeaders,
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
