import changeBlock from '@/entities/Block/api/changeBlock'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, SquarePen } from 'lucide-react'
import { RefObject, useRef, useState } from 'react'
import ImageEditor from '../../ImageEditor'
import TextEditor from '../../TextEditor'
export default function ChangeBlock({
  id,
  prevLabel,
  type,
}: {
  id: string
  prevLabel: string
  type: string
}) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState(prevLabel)
  const [file, setFile] = useState<File>()
  const themeId = useAppSelector(state => state.theme.id)
  const { mutate } = useMutation({
    mutationKey: ['blocks', id],
    mutationFn: () =>
      changeBlock({
        id,
        content: file || inputRef.current?.value || text,
      })
        .then(() => {
          setIsLoading(false)
          setOpen(false)
          queryClient
            .invalidateQueries({ queryKey: ['blocks', themeId] })
            .then(() => {})
        })
        .catch(() => {
          setIsLoading(false)
        }),
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={isLoading} asChild>
        <div className='cursor-pointer'>
          {!isLoading && (
            <SquarePen
              width={20}
              height={20}
              className=' text-neutral-600 hover:text-neutral-300  transition-colors'
            />
          )}
          {isLoading && (
            <Loader width={20} height={20} className='animate-spin' />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Изменить блок</DialogTitle>
          <DialogDescription>
            Измените контент блока в поле ниже
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {type == 'link' && (
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Ссылка
              </Label>

              <Input
                defaultValue={prevLabel}
                ref={inputRef as RefObject<HTMLInputElement>}
                id='link'
                className='col-span-3'
              />
            </div>
          )}
          {type == 'text' && (
            <div className=''>
              <TextEditor text={text} setText={setText} />
            </div>
          )}
          {type == 'image' && (
            <div className=''>
              <ImageEditor setFile={setFile} />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            className='cursor-pointer'
            disabled={isLoading}
            onClick={() => mutate()}
          >
            {!isLoading && 'Изменить'}
            {isLoading && 'Загрузка...'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
