'use client'
import { useAppDispatch } from '@/shared/lib/react/redux'
import useCanvasData from '@/shared/lib/react/useCanvasData'
import { setWidth } from '@/shared/store/slices/canvasSlice'
import { setThemeId } from '@/shared/store/slices/themeSlice'
import { ReactFlowProvider } from '@xyflow/react'
import { LoaderCircle, RefreshCwOff } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Canvas from './ui/Canvas/Canvas'
import Instruments from './ui/Instruments/Instruments'
import TopInfo from './ui/TopInfo/TopInfo'

export default function CanvasPage() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  const data = useCanvasData(id)
  useEffect(() => {
    if (wrapperRef.current) {
      const { width } = wrapperRef.current.getBoundingClientRect()
      dispatch(setWidth({ width }))
    }
    if (id) {
      dispatch(setThemeId({ id }))
    }
  }, [])
  if (data.blocksLoading || data.edgesLoading) {
    return (
      <div className='w-full h-full flex items-center justify-center flex-col gap-5'>
        <LoaderCircle className='animate-spin' width={50} height={50} />{' '}
        <p className='text-2xl font-bold'>Загрузка...</p>
      </div>
    )
  }
  if (data.blocksError || data.edgesError) {
    return (
      <div className='w-full h-full flex items-center justify-center flex-col gap-5'>
        <RefreshCwOff width={50} height={50} />
        <p className='text-2xl font-bold'>Ошибка загрузки данных</p>
      </div>
    )
  }
  return (
    <article className='relative w-full h-full'>
      <ReactFlowProvider>
        <div className='absolute  w-full h-full'>
          <TopInfo />
          <Instruments />
        </div>
        <div ref={wrapperRef} className='w-full h-full'>
          {data.blocks && data.edges && (
            <Canvas canvasData={[data.blocks, data.edges]} />
          )}
        </div>
      </ReactFlowProvider>
    </article>
  )
}
