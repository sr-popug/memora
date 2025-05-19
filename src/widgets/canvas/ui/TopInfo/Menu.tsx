import { Button } from '@/shared/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/ui/hover-card'
import { EllipsisVerticalIcon } from 'lucide-react'
import ChangeMenu from './ChangeMenu'
import DeleteMenu from './DeleteMenu'

export default function Menu({ id }: { id: string }) {
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
          <DeleteMenu id={id} />
          <ChangeMenu id={id} />
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
