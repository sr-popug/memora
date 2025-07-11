import pagesConfig from '@/shared/configs/pagesConfig'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'
import Link from 'next/link'

export default function AsideHeader() {
  return (
    <aside className='p-3 pt-4 border-r-1 border-neutral-800 h-[100vh]'>
      <TooltipProvider>
        <nav>
          <ul className='flex lg:flex-col items-center gap-8'>
            {pagesConfig.main.map(el => {
              return (
                <li key={el.title}>
                  <Link href={el.link}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className='cursor-pointer'>{el.icon}</button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{el.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </TooltipProvider>
    </aside>
  )
}
