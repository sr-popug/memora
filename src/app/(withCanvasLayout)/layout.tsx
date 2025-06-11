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
        <section className='flex '>
          <div className='hidden lg:block'>
            <AsideHeader />
          </div>
          <Themes />

          <section className=' w-full h-screen flex flex-col'>
            <TopHeader />
            <article className='flex-1 overflow-y-auto'>{children}</article>
          </section>
        </section>
        <Toaster richColors theme='dark' />
      </QueryProvider>
    </ReduxProvider>
  )
}
