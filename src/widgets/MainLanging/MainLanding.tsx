import Image from 'next/image'
import Main from './ui/Main/Main'

export default function MainLanding() {
  return (
    <article className='relative'>
      <article className='background -z-10 absolute select-none'>
        <Image
          className='w-full'
          src={'/bg-landing.svg'}
          width={2084}
          height={3134}
          alt='background'
        />
      </article>
      <article className='max-w-[1200px] mx-auto pt-28'>
        <Main />
      </article>
    </article>
  )
}
