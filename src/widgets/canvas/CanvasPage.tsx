'use client'
import useCanvasData from '@/shared/lib/react/useCanvasData'
import { LoaderCircle, RefreshCwOff } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Canvas from './ui/Canvas/Canvas'
import Instruments from './ui/Instruments/Instruments'
import TopInfo from './ui/TopInfo/TopInfo'

export default function CanvasPage() {
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  const data = useCanvasData(id)
  console.log(data)
  if (data.blocksLoading || data.edgesLoading) {
    return (
      <div className='w-full h-[94%] flex items-center justify-center flex-col gap-5'>
        <LoaderCircle className='animate-spin' width={50} height={50} />{' '}
        <p className='text-2xl font-bold'>Загрузка...</p>
      </div>
    )
  }
  if (data.blocksError || data.edgesError) {
    return (
      <div className='w-full h-[94%] flex items-center justify-center flex-col gap-5'>
        <RefreshCwOff width={50} height={50} />
        <p className='text-2xl font-bold'>Ошибка загрузки данных</p>
      </div>
    )
  }
  return (
    <article className='relative w-full h-[94%]'>
      <div className='absolute  w-full h-full'>
        <TopInfo id={id} />
        <Instruments />
      </div>
      <Canvas canvasData={[data.blocks, data.edges]} />
    </article>
  )
}
