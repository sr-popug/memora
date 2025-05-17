import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'
import { Grid2X2Plus } from 'lucide-react'

export default function Instruments() {
  return (
    <article className='flex gap-1 bg-neutral-800 p-2 rounded-xl bottom-2 absolute right-[50%] translate-x-[50%] z-10'>
      <TooltipProvider>
        <ul className='flex  items-center gap-3'>
          <li className='bg-neutral-500 w-8 h-8 flex items-center justify-center rounded-sm'>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className='cursor-pointer'>
                  <Grid2X2Plus />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Добавить блок</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </TooltipProvider>
    </article>
  )
}
