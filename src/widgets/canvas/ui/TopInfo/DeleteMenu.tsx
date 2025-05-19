import deleteTheme from '@/features/delete-theme/deleteTheme'
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
import { Button } from '@/shared/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
export default function DeleteMenu({ id }: { id: string }) {
  const queryClient = useQueryClient()

  const router = useRouter()
  const { mutate } = useMutation({
    mutationKey: ['themes'],
    mutationFn: () => deleteTheme(id),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] }).then(() => {
        router.push('/canvas')
      })
    },
  })
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='cursor-pointer'>
          <Trash /> Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы действительно хотите удалить тему?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это действие удалит тему без возможности восстановления
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction
            className='cursor-pointer'
            onClick={() => mutate()}
          >
            Удалить!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
