'use client'
import { api } from '@/shared/api/axiosApi'
import { toast } from 'sonner'
interface CreateData {
  themeId: string
  type: string
  content: string
  positionX: number
  positionY: number
}
export default async function createBlock(data: CreateData) {
  const formData = new FormData()
  formData.append('positionX', data.positionX + '')
  formData.append('positionY', data.positionY + '')
  formData.append('content', data.content + '')
  formData.append('type', data.type + '')
  formData.append('themeId', data.themeId + '')
  console.log(process.env.NEXT_PUBLIC_URL)
  try {
    return await api.post(
      `${process.env.NEXT_PUBLIC_URL}/api/blocks`,

      formData
    )
  } catch {
    toast.error('Ошибка запроса', {
      description: 'Что-то пошло не так',
    })
  }
}
