// export const metadata: Metadata = {
//   title: 'Memora -',
//   description: 'Запоминай самое важное!',
// }

import AsideHeader from '@/widgets/canvasLayout/AsideHeader/AsideHeader'
import ThemesList from '@/widgets/canvasLayout/ThemesList/ThemesList'
import TopHeader from '@/widgets/canvasLayout/TopHeader/TopHeader'

export default function CanvasLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className='flex '>
        <AsideHeader />
        <ThemesList />

        <div className=' w-full'>
          <TopHeader />
          {children}
        </div>
      </div>
    </>
  )
}
