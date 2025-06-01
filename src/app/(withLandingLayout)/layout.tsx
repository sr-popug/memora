import Footer from '@/widgets/MainLanging/ui/Footer/Footer'
import Header from '@/widgets/MainLanging/ui/Header/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='h-[100vh] overflow-hidden'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
