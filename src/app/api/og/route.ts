import { NextRequest } from 'next/server'
import ogs from 'open-graph-scraper'

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  const { result, error } = await ogs({ url, timeout: 100000 })

  if (error) {
    return new Response(JSON.stringify({ error: true }), { status: 400 })
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
