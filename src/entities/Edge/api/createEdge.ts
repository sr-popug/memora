'use client'
import { api } from '@/shared/api/axiosApi'
import { toast } from 'sonner'

interface CreateData {
  from: string
  to: string
  themeId: string
}

export default async function createEdge(data: CreateData) {
  try {
    return await api.post(
      `${process.env.NEXT_PUBLIC_URL}/api/edges`,

      data
    )
  } catch {
    toast.error('Ошибка запроса', {
      description: 'Что-то пошло не так',
    })
  }
}
