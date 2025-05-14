import QueryProvider from '@/shared/ui/providers/QueryProvider'
import AsideHeader from '@/widgets/canvasLayout/AsideHeader/AsideHeader'
import Themes from '@/widgets/canvasLayout/Themes/Themes'
import TopHeader from '@/widgets/canvasLayout/TopHeader/TopHeader'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Memora - Доска темы',
  description: 'Запоминай самое важное!',
}

export default function CanvasLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryProvider>
      <div className='flex '>
        <AsideHeader />
        <Themes />

        <div className=' w-full'>
          <TopHeader />
          {children}
        </div>
      </div>
    </QueryProvider>
  )
}
