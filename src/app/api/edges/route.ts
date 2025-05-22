import prisma from '@/shared/api/prismaClient'
import { NextRequest } from 'next/server'
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const themeId = searchParams.get('themeId')
  console.log(themeId)
  try {
    let edges
    if (themeId) {
      edges = await prisma.edge.findMany({
        where: {
          themeId: themeId,
        },
      })
    } else {
      edges = await prisma.edge.findMany({
        where: {
          themeId: themeId,
        },
      })
    }
    return new Response(JSON.stringify(edges), { status: 200 })
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
  const data = await NextRequest.json()

  try {
    const result = await prisma.edge.create({
      data: data,
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
      const edge = await prisma.edge.delete({
        where: {
          id: query,
        },
      })
      return new Response(JSON.stringify(edge), { status: 200 })
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 403 })
    }
  }
}
export async function PATCH(NextRequest: NextRequest) {
  const data = await NextRequest.json()
  console.log(data)
  try {
    const result = await prisma.edge.update({
      where: {
        id: data.id,
      },
      data: data,
    })
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify(err), { status: 403 })
  }
}
