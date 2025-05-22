import { TooltipProvider } from '@/shared/ui/tooltip'
import { CreateText } from './ui/CreateImage'
import { CreateLink } from './ui/CreateLink'
import { CreateImage } from './ui/CreateText'

export default function Instruments() {
  return (
    <article className='flex gap-1 bg-neutral-800 p-2 rounded-xl bottom-2 absolute right-[50%] translate-x-[50%] z-10'>
      <TooltipProvider>
        <ul className='flex  items-center gap-3'>
          <li className='bg-neutral-700 w-8 h-8 flex items-center justify-center rounded-sm'>
            <CreateLink />
          </li>
          <li className='bg-neutral-700 w-8 h-8 flex items-center justify-center rounded-sm'>
            <CreateImage />
          </li>
          <li className='bg-neutral-700 w-8 h-8 flex items-center justify-center rounded-sm'>
            <CreateText />
          </li>
        </ul>
      </TooltipProvider>
    </article>
  )
}
