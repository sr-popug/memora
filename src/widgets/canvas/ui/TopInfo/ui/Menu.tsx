import { Button } from '@/shared/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/ui/hover-card'
import { EllipsisVerticalIcon } from 'lucide-react'
import ChangeMenu from './ChangeMenu'
import DeleteMenu from './DeleteMenu'

export default function Menu({ id, name }: { id: string; name: string }) {
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
      <HoverCardContent className='w-50'>
        <div className='flex flex-col  gap-2'>
          <ChangeMenu prevName={name} id={id} />
          <DeleteMenu id={id} />
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
