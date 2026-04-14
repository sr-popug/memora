import Footer from '@/widgets/main/ui/Footer/Footer'
import Header from '@/widgets/main/ui/Header/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='h-[calc(100vh + 80px)] overflow-hidden'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
