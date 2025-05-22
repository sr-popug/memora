import { api } from '@/shared/api/axiosApi'
import { Edge } from '@prisma/client'

export default async function getEdges(id: string) {
  try {
    return (
      (await api.get<Edge[]>(
        `${process.env.NEXT_PUBLIC_URL}/api/edges?themeId=${id}`
      )) || [
        {
          id: '123',
          from: '123',
          to: '345',
        },
      ]
    ).data
  } catch {
    return new Error('Ошибка при получении связей')
  }
}
