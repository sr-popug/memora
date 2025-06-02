'use client'
import useCreateBlock from '@/shared/lib/react/useCreateBlock'
import isValidHttpUrl from '@/shared/scripts/isValidUrl'
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
import { Label } from '@/shared/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { Link } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

export default function CreateLink() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useCreateBlock('link')

  const handleClick = () => {
    const value = inputRef.current?.value || ''
    if (!isValidHttpUrl(value)) {
      toast.error('Введённое значение не является ссылкой')
      return
    }

    mutate(value, {
      onSuccess: () => {
        setOpen(false)
        inputRef.current!.value = ''
      },
      onError: () => {
        toast.error('Ошибка при создании блока')
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='cursor-pointer'>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Link />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Добавить ссылку</p>
            </TooltipContent>
          </Tooltip>
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Добавить ссылку</DialogTitle>
          <DialogDescription>
            Напишите ссылку на интернет-ресурс в поле ниже
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='link' className='text-right'>
              Ссылка
            </Label>
            <Input ref={inputRef} id='link' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick} disabled={isPending}>
            {isPending ? 'Загрузка...' : 'Создать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
