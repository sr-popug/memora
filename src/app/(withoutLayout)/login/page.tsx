import ButtonGitHub from '@/widgets/auth/ButtonGitHub'
import Image from 'next/image'
import Link from 'next/link'

export default function Auth() {
  return (
    <article className='flex h-[100vh]  overflow-hidden'>
      <section className='bg w-[60%]'>
        <Image
          className='opacity-20 w-full'
          src='/auth.png'
          alt='background'
          width={800}
          height={800}
        />
      </section>
      <section className='content w-[40%] flex flex-col items-center justify-between'>
        <div></div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-5xl font-bold text-center'>Войти в аккаунт</h1>

          <p className='opacity-60 mb-5'>
            Можно авторизоваться только через социальные сети
          </p>
          <div className='flex flex-col items-stretch w-full gap-3 max-w-[500px]'></div>
          <ButtonGitHub />
        </div>
        <footer className='text-center'>
          <Link href='/' className='opacity-50 block mb-2 underline'>
            Вернуться на главную
          </Link>
          <p className='opacity-60 mb-5'>© 2025 • Hollow</p>
        </footer>
      </section>
    </article>
  )
}
