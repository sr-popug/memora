import prisma from '@/shared/api/prismaClient'
import { NextRequest } from 'next/server'

export async function GET(NextRequest: NextRequest) {
  const searchParams = NextRequest.nextUrl.searchParams
  const id = searchParams.get('id') || null
  console.log(id)

  if (id) {
    try {
      const theme = await prisma.theme.findUnique({
        where: {
          id,
        },
      })
      return new Response(JSON.stringify(theme), { status: 200 })
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 403 })
    }
  }
}
