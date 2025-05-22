import { api } from '@/shared/api/axiosApi'
import { Block } from '@prisma/client'
import { toast } from 'sonner'

export default async function getBlocks(id: string) {
  console.log(process.env.NEXT_PUBLIC_URL)

  try {
    const data = await api.get<Block[]>(
      `${process.env.NEXT_PUBLIC_URL}/api/blocks?themeId=${id}`
    )
    return data.data
  } catch {
    toast.error('Не удалось получить данные', {
      description: 'Что-то пошло не так',
    })
  }
}
