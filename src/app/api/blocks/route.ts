import prisma from '@/shared/api/prismaClient'
import { randomUUID } from 'crypto'
import { unlink, writeFile } from 'fs/promises'
import { NextRequest } from 'next/server'
import path from 'path'

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
    if (type == 'image') {
      const file: File | null = data.get('content') as File
      if (!file)
        return new Response(
          JSON.stringify(JSON.parse(JSON.stringify(result))),
          { status: 400 }
        )
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const extension = path.extname(file.name)
      const filename = randomUUID() + extension
      const uploadDir = path.join(process.cwd(), 'public/uploads')
      await writeFile(`${uploadDir}/${filename}`, buffer)

      result = await prisma.block.create({
        data: {
          content: filename || '',
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
      const deletedBlock = await prisma.block.findUnique({
        where: {
          id: query,
        },
      })
      if (deletedBlock?.type == 'image') {
        const filePath = path.join(
          process.cwd(),
          'public/uploads',
          deletedBlock!.content
        )
        await unlink(filePath)
      }
      await prisma.block.delete({
        where: {
          id: query,
        },
      })
      return new Response(JSON.stringify({ message: 'Блок удалён' }), {
        status: 200,
      })
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 403 })
    }
  }
}
export async function PATCH(NextRequest: NextRequest) {
  const data = await NextRequest.formData()
  const id = data.get('id') as string

  let updateData: Record<string, string | File | number> = {}
  for (const [key, value] of data.entries()) {
    if (key !== 'id') {
      if (!isNaN(Number(value))) {
        updateData[key] = Number(value)
      } else {
        updateData[key] = value
      }
    }
  }

  const patchedBlock = await prisma.block.findUnique({
    where: {
      id: data.get('id')! as string,
    },
  })

  if (patchedBlock?.type == 'image' && data.get('content')) {
    const filePath = path.join(
      process.cwd(),
      'public/uploads',
      patchedBlock!.content
    )
    await unlink(filePath)
    const file: File | null = updateData.content as File
    console.log(file)
    if (!file)
      return new Response(JSON.stringify(JSON.parse(JSON.stringify(42))), {
        status: 400,
      })
    const bytes = await file.arrayBuffer()
    const extension = path.extname(file.name)
    const buffer = Buffer.from(bytes)
    const filename = randomUUID() + extension
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    updateData = { content: filename }

    await writeFile(`${uploadDir}/${filename}`, buffer)
  }
  try {
    const result = await prisma.block.update({
      where: {
        id,
      },
      data: updateData,
    })
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 403 })
  }
}
