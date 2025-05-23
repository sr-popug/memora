'use client'
import createBlock from '@/entities/Block/api/createBlock'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { Image } from 'lucide-react'
import { useRef, useState } from 'react'

export default function CreateImage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const canvas = useAppSelector(state => state.canvas)
  const { id } = useAppSelector(state => state.theme)
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const project = useReactFlow()
  const { mutate } = useMutation({
    mutationKey: ['blocks', id],
    mutationFn: (value: string) =>
      createBlock({
        content: value,
        themeId: id,
        positionX: project.getViewport().x + canvas.width / 1.75,
        positionY: project.getViewport().y + window.innerHeight / 2 - 80,
        type: 'text',
      })
        .then(() => {
          setIsLoading(false)
          setOpen(false)
          queryClient
            .invalidateQueries({ queryKey: ['blocks', id] })
            .then(() => {})
        })
        .catch(() => {
          setIsLoading(false)
        }),
  })

  function handleClick() {
    console.log(inputRef.current?.value)
    setIsLoading(true)
    if (inputRef.current?.value) mutate(inputRef.current?.value)
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
              <p>Добавить картинку</p>
            </TooltipContent>
          </Tooltip>
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Добавить картинку</DialogTitle>
          <DialogDescription>
            Выберите изображение с вашего устройства и добавьте его на доску
            темы
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
