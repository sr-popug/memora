import deleteBlock from '@/entities/Block/api/deleteBlock'
import { useAppSelector } from '@/shared/lib/react/redux'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, Trash } from 'lucide-react'
import { useState } from 'react'
export default function DeleteBlock({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const themeId = useAppSelector(state => state.theme.id)

  const { mutate } = useMutation({
    mutationKey: ['block', id],
    mutationFn: () =>
      deleteBlock(id)
        .then(() => {
          setIsLoading(false)
          setOpen(false)
          queryClient
            .invalidateQueries({ queryKey: ['blocks', themeId] })
            .then(() => {})
        })
        .catch(() => {
          setIsLoading(false)
        }),
  })
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger disabled={isLoading} asChild>
        <div className='cursor-pointer'>
          {!isLoading && (
            <Trash
              width={20}
              height={20}
              className=' text-red-400 hover:text-red-500 transition-colors'
            />
          )}
          {isLoading && (
            <Loader width={20} height={20} className='animate-spin' />
          )}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы действительно хотите удалить блок?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это действие удалит блок безвозвратно!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            className='bg-red-900 text-white cursor-pointer hover:bg-red-800'
            disabled={isLoading}
            onClick={() => mutate()}
          >
            {!isLoading && 'Удалить'}
            {isLoading && 'Загрузка...'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
