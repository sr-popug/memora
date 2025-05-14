'use client'

import { Skeleton } from '@/shared/ui/skeleton'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function UserInfo() {
  const session = useSession()
  if (!session.data?.user) {
    return (
      <div className='flex items-center w-50 gap-2 '>
        <Skeleton className='h-[35px] w-[35px] rounded-full' />
        <Skeleton className='h-4 w-36' />
      </div>
    )
  }
  return (
    <Link
      href={'/profile'}
      className='flex items-center gap-2 hover:bg-neutral-900 px-3 rounded-xl'
    >
      {session.data?.user?.image && (
        <Image
          src={session.data?.user?.image}
          alt='profile'
          width={35}
          height={35}
          className='rounded-4xl'
        />
      )}
      <p>{session.data?.user?.name}</p>
    </Link>
  )
}
