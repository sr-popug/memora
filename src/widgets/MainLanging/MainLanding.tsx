import Image from 'next/image'

export default function MainLanding() {
  return (
    <article className='relative'>
      <article className='background -z-10 absolute select-none'>
        <Image
          src={'/bg-landing.svg'}
          width={2084}
          height={3134}
          alt='background'
        />
      </article>
      <article className='content text-chart-5'>32</article>
    </article>
  )
}
