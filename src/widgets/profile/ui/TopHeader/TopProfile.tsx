import { Button } from '@/shared/ui/button'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function TopProfile() {
  const session = useSession()
  return (
    <article className='mt-5 flex gap-7 flex-wrap w-full justify-center lg:justify-start'>
      {session.data?.user?.image && (
        <Image
          src={session.data?.user?.image}
          width={200}
          height={200}
          alt='profile'
          className='rounded-full'
        />
      )}
      <div className='flex flex-col  justify-between items-start'>
        <div className='top'>
          <h2 className='text-center lg:text-left text-3xl font-bold'>
            {session.data?.user?.name}
          </h2>
          <p className=' text-center lg:text-left text-neutral-600'>
            {session.data?.user?.email}
          </p>
        </div>
        <div className='flex gap-2 w-full justify-center lg:justify-start'>
          <Button
            onClick={() => signOut()}
            variant='destructive'
            className='cursor-pointer mt-2'
          >
            <LogOut />
            Выйти
          </Button>

          {/* <ChangeData /> */}
        </div>
      </div>
    </article>
  )
}
