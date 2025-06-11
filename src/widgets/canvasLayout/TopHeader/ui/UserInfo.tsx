'use client'

import { Skeleton } from '@/shared/ui/skeleton'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function UserInfo() {
  const session = useSession()
  if (!session.data?.user) {
    return (
      <div className='hidden items-center lg:flex gap-2 '>
        <Skeleton className='h-6 w-6 lg:h-[35px] lg:w-[35px] rounded-full' />
        <Skeleton className='h-3 w-20 lg:h-4 lg:w-35' />
      </div>
    )
  }
  return (
    <Link
      href={'/profile'}
      className='hidden items-center lg:flex gap-2 hover:bg-neutral-900 px-3 rounded-xl'
    >
      {session.data?.user?.image && (
        <Image
          src={session.data?.user?.image}
          alt='profile'
          width={35}
          height={35}
          className='rounded-4xl w-6 h-6 lg:w-8 lg:h-8'
        />
      )}
      <p className='text-sm lg:text-lg text-nowrap'>
        {session.data?.user?.name}
      </p>
    </Link>
  )
}
