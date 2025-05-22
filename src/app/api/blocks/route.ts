import prisma from '@/shared/api/prismaClient'
import { NextRequest } from 'next/server'
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const themeId = searchParams.get('themeId')
  console.log(themeId)
  try {
    let blocks
    if (themeId) {
      blocks = await prisma.block.findMany({
        where: {
          themeId: themeId,
        },
      })
    } else {
      blocks = await prisma.block.findMany({
        where: {
          themeId: themeId,
        },
      })
    }
    return new Response(JSON.stringify(blocks), { status: 200 })
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
  const type = data.get('type')
  try {
    let result
    if (type == 'link' || type == 'text') {
      result = await prisma.block.create({
        data: {
          content: (data.get('content') as string) || '',
          type: (data.get('type') as string) || '',
          positionX: (Number(data.get('positionX')) || 0) as number,
          positionY: (Number(data.get('positionY')) || 0) as number,
          themeId: (data.get('themeId') as string) || '',
        },
      })
    }

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
      const block = await prisma.block.delete({
        where: {
          id: query,
        },
      })
      return new Response(JSON.stringify(block), { status: 200 })
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 403 })
    }
  }
}
export async function PATCH(NextRequest: NextRequest) {
  const data = await NextRequest.json()
  try {
    const result = await prisma.block.update({
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
