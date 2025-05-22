'use client'
import { api } from '@/shared/api/axiosApi'
import { Block } from '@prisma/client'
import { toast } from 'sonner'

export default async function changeBlock(data: Partial<Block>) {
  try {
    return await api.patch(
      `${process.env.NEXT_PUBLIC_URL}/api/blocks`,

      data
    )
  } catch {
    toast.error('Ошибка запроса', {
      description: 'Что-то пошло не так',
    })
  }
}
