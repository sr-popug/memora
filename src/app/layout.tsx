import NextAuthProvider from '@/shared/ui/providers/NextAuthProvider'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const SF = localFont({
  src: [
    {
      path: './fonts/SFProText-Light.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/SFProText-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SFProText-Bold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: 'Memora',
  description: 'Запоминай самое важное!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`dark ${SF.className}antialiased`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
