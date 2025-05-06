'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export default function ButtonGitHub() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile'

  return (
    <button
      onClick={() => signIn('github', { callbackUrl }).then(() => {})}
      className='bg-white text-black font-semibold flex gap-3 py-2 rounded-lg px-10 hover:bg-neutral-300 cursor-pointer justify-center'
    >
      <Image src='/github.svg' width={30} height={30} alt='github' />
      Войти через GitHub
    </button>
  )
}
