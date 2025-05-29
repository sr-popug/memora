'use client'
import addTheme from '@/entities/Themes/api/addTheme'
import { useAppDispatch, useAppSelector } from '@/shared/lib/react/redux'
import { addTheme as addStateTheme } from '@/shared/store/slices/themeListSlice'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import SelectEmoji from '@/shared/ui/SelectEmoji/SelectEmoji'
import { Theme } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function AddTheme() {
  const [emoji, setEmoji] = useState('😀')
  const [open, setOpen] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const router = useRouter()
  const themes = useAppSelector(state => state.themeList)
  const dispatch = useAppDispatch()
  const session = useSession()
  const { mutate } = useMutation({
    mutationKey: ['add theme'],
    mutationFn: () =>
      addTheme({
        name: nameRef.current?.value as string,
        emoji,
        userEmail: session.data?.user.email || 'not-found',
        position: themes.length,
      }),
    onSuccess: (data: Theme) => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['themes'] }).then(() => {
        router.push(`/canvas/${data.id}`)
      })
      dispatch(addStateTheme(data))
    },
    onError: () => {
      console.log('⨯ error')
    },
  })
  const addThemeButton = async function () {
    console.log(themes)
    mutate()
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='mt-4 w-full cursor-pointer' variant='outline'>
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Добавить доску темы</DialogTitle>
          <DialogDescription>
            Вы можете добавить новую доску по определенной теме
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-2'>
          <form action='' className='flex gap-2'>
            <SelectEmoji emojiState={emoji} setEmojiState={setEmoji} />
            <Input
              ref={nameRef}
              minLength={5}
              placeholder='Введите название темы'
            />
          </form>
        </div>
        <DialogFooter>
          <Button
            onClick={addThemeButton}
            type='submit'
            className='cursor-pointer'
          >
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
