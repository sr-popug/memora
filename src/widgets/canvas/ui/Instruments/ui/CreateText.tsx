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
import { Text } from 'lucide-react'
import { useState } from 'react'
import TextEditor from '../../TextEditor'

export default function CreateText() {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const [text, setText] = useState('')

  const canvas = useAppSelector(state => state.canvas)
  const { id } = useAppSelector(state => state.theme)
  const queryClient = useQueryClient()
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

  async function handleClick() {
    console.log(text)
    setIsLoading(true)
    if (text) await mutate(text)
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
