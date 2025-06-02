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
import { Image } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import ImageEditor from '../../ImageEditor'

export default function CreateImage() {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File>()

  const { mutate, isPending } = useCreateBlock('image')

  const handleClick = () => {
    if (!file) {
      toast.error('Вы не выбрали изображение')
      return
    }

    mutate(file, {
      onSuccess: () => {
        setOpen(false)
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
          <Button onClick={handleClick} disabled={isPending}>
            {isPending ? 'Загрузка...' : 'Создать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
