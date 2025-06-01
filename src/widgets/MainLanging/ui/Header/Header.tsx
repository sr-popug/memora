import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='border-b-neutral-600 border-b py-3 mb-2'>
      <div className='max-w-[1200px] mx-auto flex justify-between items-center gap-5'>
        <Link href={'/'}>
          <Image src='/logo.svg' width={152} height={40} alt='logo' />
        </Link>
        <div className='buttons flex align-center gap-4'>
          <Link
            className='py-2 px-10 font-semibold text-neutral-900 bg-gradient-to-l text- from-yellow-500 to-yellow-200 rounded-3xl transition-colors  hover:to-yellow-500'
            href={'/canvas'}
          >
            Вход
          </Link>
          <Link
            className='py-2 px-10 font-semibold text-neutral-900 bg-gradient-to-l text- from-blue-500 to-blue-200 transition-colors rounded-3xl hover:to-blue-500'
            href={'/canvas'}
          >
            Регистрация
          </Link>
        </div>
      </div>
    </header>
  )
}
