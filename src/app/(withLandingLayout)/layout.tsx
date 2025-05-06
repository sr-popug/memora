import Footer from '@/widgets/MainLanging/ui/Footer/Footer'
import Header from '@/widgets/MainLanging/ui/Header/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
