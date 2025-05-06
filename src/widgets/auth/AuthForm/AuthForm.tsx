'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ButtonGitHub from './ButtonGitHub'

export default function AuthForm() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })
    if (res && !res.error) {
      router.push('/profile')
    } else {
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col gap-3 w-full'>
      <form
        className='flex flex-col w-full gap-3 max-w-[500px]'
        onSubmit={handleSubmit}
      >
        <input
          className='p-3 rounded-lg bg-neutral-800'
          name='email'
          type='email'
          placeholder='Ваш эл. адрес'
          required
        />
        <input
          className='p-3 rounded-lg bg-neutral-800'
          name='password'
          type='password'
          placeholder='Введите пароль'
          required
        />
        <button
          className='p-3 rounded-lg bg-neutral-950 font-bold hover:bg-black cursor-pointer'
          disabled={loading}
          type='submit'
        >
          {!loading && 'Авторизация'}
          {loading && 'Загрузка'}
        </button>
      </form>

      <ButtonGitHub />
    </div>
  )
}
