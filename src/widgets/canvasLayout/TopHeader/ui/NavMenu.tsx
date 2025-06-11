'use client'
import pagesConfig from '@/shared/configs/pagesConfig'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function NavMenu() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className='cursor-pointer lg:hidden'>
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Навигация</SheetTitle>
        </SheetHeader>
        <nav>
          <ul className=' flex flex-col gap-5 ml-4'>
            {pagesConfig.main.map(el => {
              return (
                <li
                  key={el.title}
                  className='group'
                  onClick={() => setOpen(prev => !prev)}
                >
                  <Link href={el.link} className='flex gap-3 items-center'>
                    <span className='group-hover:text-blue-500 transition-colors'>
                      {el.icon}
                    </span>
                    <p className='group-hover:text-blue-500 transition-colors'>
                      {el.title}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
