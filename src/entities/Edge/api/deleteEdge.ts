'use client'
import { api } from '@/shared/api/axiosApi'
import { toast } from 'sonner'

export default async function deleteEdge(id: string) {
  return await api
    .delete(`${process.env.NEXT_PUBLIC_URL}/api/edges?id=${id}`)
    .catch(() => {
      toast.error('Не удалось удалить связь', {
        description: 'Ошибка сервера',
      })
    })
}
