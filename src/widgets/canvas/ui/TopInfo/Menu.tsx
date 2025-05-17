import { Button } from '@/shared/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/ui/hover-card'
import { EllipsisVerticalIcon, Pen, Trash } from 'lucide-react'

export default function Menu() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant='outline'
          className='w-8 h-8 rounded-full cursor-pointer'
        >
          <EllipsisVerticalIcon />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className=''>
        <div className='flex justify-between space-x-1'>
          <Button variant='destructive' className='cursor-pointer'>
            <Trash /> Удалить
          </Button>
          <Button variant='outline' className='cursor-pointer'>
            <Pen /> Изменить
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
