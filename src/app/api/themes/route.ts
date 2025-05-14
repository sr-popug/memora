import prisma from '@/shared/api/prismaClient'
import { NextRequest } from 'next/server'
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  console.log(email)
  try {
    let themes
    if (email) {
      themes = await prisma.theme.findMany({
        where: {
          userEmail: email,
        },
      })
    } else {
      themes = null
    }
    return new Response(JSON.stringify(themes), { status: 200 })
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: err instanceof Error ? err.message : 'Unknown error',
        code: err instanceof Error && 'code' in err ? err.code : undefined,
      }),
      { status: 403 }
    )
  }
}
export async function POST(NextRequest: NextRequest) {
  const data = await NextRequest.formData()
  try {
    const result = await prisma.theme.create({
      data: {
        name: (data.get('name') as string) || '',
        emoji: (data.get('emoji') as string) || '',
        position: (Number(data.get('position')) || 2000) as number,
        userEmail: (data.get('userEmail') as string) || 'not-found',
      },
    })
    return new Response(JSON.stringify(JSON.parse(JSON.stringify(result))), {
      status: 200,
    })
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: err instanceof Error ? err.message : 'Unknown error',
        code: err instanceof Error && 'code' in err ? err.code : undefined,
      }),
      { status: 403 }
    )
  }
}
export async function DELETE(NextRequest: NextRequest) {
  const searchParams = NextRequest.nextUrl.searchParams
  const query = searchParams.get('id') || ''
  if (query) {
    try {
      const theme = await prisma.theme.delete({
        where: {
          id: query,
        },
      })
      return new Response(JSON.stringify(theme), { status: 200 })
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 403 })
    }
  }
}
export async function PATCH(NextRequest: NextRequest) {
  const data = await NextRequest.json()
  try {
    const result = await prisma.theme.update({
      where: {
        id: data.id,
      },
      data: data,
    })
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 403 })
  }
}
