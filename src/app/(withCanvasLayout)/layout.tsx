import ReduxProvider from '@/shared/store/ReduxProvider'
import QueryProvider from '@/shared/ui/providers/QueryProvider'
import AsideHeader from '@/widgets/canvasLayout/AsideHeader/AsideHeader'
import Themes from '@/widgets/canvasLayout/Themes/Themes'
import TopHeader from '@/widgets/canvasLayout/TopHeader/TopHeader'
import { Metadata } from 'next'
import { Toaster } from 'sonner'

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
    <ReduxProvider>
      <QueryProvider>
        <div className='flex '>
          <AsideHeader />
          <Themes />

          <div className=' w-full'>
            <TopHeader />
            {children}
          </div>
        </div>
        <Toaster richColors theme='dark' />
      </QueryProvider>
    </ReduxProvider>
  )
}
