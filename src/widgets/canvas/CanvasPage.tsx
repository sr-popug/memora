'use client'
import useCanvasData from '@/shared/lib/react/useCanvasData'
import { usePathname } from 'next/navigation'
import Canvas from './ui/Canvas/Canvas'
import Instruments from './ui/Instruments/Instruments'
import TopInfo from './ui/TopInfo/TopInfo'

export default function CanvasPage() {
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  const { data } = useCanvasData(id)
  return (
    <article className='relative w-full h-[94%]'>
      <div className='absolute  w-full h-full'>
        <TopInfo id={id} />
        <Instruments />
      </div>
      <Canvas canvasData={data} />
    </article>
  )
}
