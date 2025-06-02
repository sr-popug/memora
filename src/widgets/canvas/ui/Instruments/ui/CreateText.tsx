'use client'
import useCreateBlock from '@/shared/lib/react/useCreateBlock'
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { Text } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import TextEditor from '../../TextEditor'

export default function CreateText() {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const [text, setText] = useState('')

  const { mutate } = useCreateBlock('text')

  async function handleClick() {
    console.log(text)
    setIsLoading(true)
    if (text) await mutate(text)
    if (!text.length) toast.error('Вы ничего не ввели в поле ввода текста')
    setIsLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='cursor-pointer'>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Text />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Добавить текстовый блок</p>
            </TooltipContent>
          </Tooltip>
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Добавить текстовый блок</DialogTitle>
          <DialogDescription>
            Напишите содержание для вашего блока
          </DialogDescription>
        </DialogHeader>
        <div className=''>
          <div className=''>
            <TextEditor text={text} setText={setText} />
          </div>
        </div>
        <DialogFooter>
          <Button
            className='cursor-pointer'
            disabled={isLoading}
            onClick={handleClick}
          >
            {!isLoading && 'Создать'}
            {isLoading && 'Загрузка...'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
