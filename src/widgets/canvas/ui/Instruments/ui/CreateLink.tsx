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
import { Link } from 'lucide-react'
import { useRef, useState } from 'react'

export default function CreateLink() {
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
        type: 'link',
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

  async function handleClick() {
    setIsLoading(true)
    if (inputRef.current?.value) mutate(inputRef.current?.value)
    else setIsLoading(false)
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
            Напишите ссылку на интернет ресурс в поле ниже
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Ссылка
            </Label>
            <Input ref={inputRef} id='link' className='col-span-3' />
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
