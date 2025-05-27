'use client'
import { api } from '@/shared/api/axiosApi'
import { Block } from '@prisma/client'
import { toast } from 'sonner'

export default async function changeBlock(data: Partial<Block>) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })
  console.log(formData.get('content'))
  try {
    return await api.patch(
      `${process.env.NEXT_PUBLIC_URL}/api/blocks`,

      formData
    )
  } catch {
    toast.error('Ошибка запроса', {
      description: 'Что-то пошло не так',
    })
  }
}
