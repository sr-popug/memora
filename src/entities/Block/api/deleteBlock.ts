'use client'
import { api } from '@/shared/api/axiosApi'
import { toast } from 'sonner'

export default async function deleteBlock(id: string) {
  return await api
    .delete(`${process.env.NEXT_PUBLIC_URL}/api/blocks?id=${id}`)
    .catch(() => {
      toast.error('Не удалось удалить блок', {
        description: 'Ошибка сервера',
      })
    })
}
