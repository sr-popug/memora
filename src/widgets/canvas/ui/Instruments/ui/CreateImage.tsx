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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { Image } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import ImageEditor from '../../ImageEditor'

export default function CreateImage() {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File>()

  const [isLoading, setIsLoading] = useState(false)
  const canvas = useAppSelector(state => state.canvas)
  const { id } = useAppSelector(state => state.theme)
  const queryClient = useQueryClient()
  const project = useReactFlow()
  const { mutate } = useMutation({
    mutationKey: ['blocks', id],
    mutationFn: () =>
      createBlock({
        content: file!,
        themeId: id,
        positionX: project.getViewport().x + canvas.width / 1.75,
        positionY: project.getViewport().y + window.innerHeight / 2 - 90,
        type: 'image',
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
    setIsLoading(true)
    if (file) mutate()
    if (!file) toast.error('Вы не выбрали изображение')
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
        <ImageEditor setFile={setFile} />
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
