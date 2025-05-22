'use client'
import { useAppSelector } from '@/shared/lib/react/redux'
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
import { useMutation } from '@tanstack/react-query'
import { Image } from 'lucide-react'
import { useRef, useState } from 'react'

export function CreateImage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useAppSelector(state => state.theme)
  const [open, setOpen] = useState(false)
  const { mutate } = useMutation({
    mutationKey: ['blocks', id],
    mutationFn: (value: string) => {},
  })

  async function handleClick() {
    setIsLoading(true)
    if (inputRef.current?.value) await mutate(inputRef.current?.value)
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
                <Image />
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
            Напишите ссылку на интернет ресурс в поле ниже
          </DialogDescription>
        </DialogHeader>
        <div className=''>
          <div className=''>
            <Label htmlFor='username' className='text-right mb-2'>
              Ссылка
            </Label>
            <Input
              ref={inputRef}
              type='image'
              id='link'
              className='col-span-3'
            />
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
