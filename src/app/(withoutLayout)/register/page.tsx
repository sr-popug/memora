import RegisterForm from '@/widgets/auth/AuthForm/RegisterForm'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPage() {
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
          <h1 className='text-5xl font-bold text-center  mb-5'>Регистрация</h1>

          <RegisterForm />

          <p className='text-gray-500 mt-5'>
            Уже есть аккаунт?{' '}
            <Link className='text-blue-500 hover:underline' href='/login'>
              Войти!
            </Link>{' '}
          </p>
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
