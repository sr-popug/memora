'use client'
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

import changeTheme from '@/entities/Themes/api/changeTheme'
import SelectEmoji from '@/shared/ui/SelectEmoji/SelectEmoji'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pen } from 'lucide-react'
import { useRef, useState } from 'react'

export default function ChangeMenu({
  id,
  prevName,
}: {
  id: string
  prevName: string
}) {
  const [emoji, setEmoji] = useState('😀')
  const [open, setOpen] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['change theme'],
    mutationFn: () =>
      changeTheme({
        id: id,
        name: nameRef.current?.value as string,
        emoji,
      }),
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['themes'] })
    },
    onError: () => {
      console.log('⨯ error')
    },
  })
  const addThemeButton = async function () {
    console.log(emoji, nameRef.current?.value)
    mutate()
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='flex gap-2 items-center justify-between p-1 cursor-pointer hover:bg-neutral'>
          Изменить
          <Pen width={16} height={16} className='text-neutral-600' />
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Изменить доску</DialogTitle>
          <DialogDescription>
            Вы можете изменить название и емоджи доски темы
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-2'>
          <form action='' className='flex gap-2'>
            <SelectEmoji emojiState={emoji} setEmojiState={setEmoji} />
            <Input
              ref={nameRef}
              defaultValue={prevName}
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
            Изменить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
