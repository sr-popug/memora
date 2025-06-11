import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
  return (
    <article className=' flex justify-center lg:justify-between gap-2 px-2'>
      <section className='left'>
        <div className='flex justify-center lg:justify-start'>
          <Image
            src={'/figure-1.svg'}
            alt='figure-1'
            width={120}
            height={120}
          />
        </div>
        <h1 className=' max-w-[450px] font-bold text-[40px] leading-[1.2]  mt-8 text-center lg:text-left '>
          Удобное хранение важных ссылок и заметок.
        </h1>
        <p className='text-neutral-600 text-[16px] font-bold  text-center lg:text-left'>
          Собери свой интернет!
        </p>
        <p className='text-[16px] mt-8 max-w-[450px]  text-center lg:text-left px-2 lg:px-0'>
          Сохраняй полезные статьи, видео, твиты и ссылки в один клик. Организуй
          их по темам, находи нужное мгновенно и строй свою цифровую базу
          знаний.
        </p>
        <div className='flex gap-5 mt-5 justify-center lg:justify-start'>
          <Link
            className='py-2 px-15 font-semibold text-neutral-900 bg-gradient-to-l text- from-yellow-500 to-yellow-200 rounded-3xl transition-colors  hover:to-yellow-500'
            href={'/canvas'}
          >
            Начать!
          </Link>
          {/* <Link
            className='py-2 px-8 font-semibold text-neutral-900 bg-gradient-to-l text- from-yellow-500 to-yellow-200 rounded-3xl transition-colors  hover:to-yellow-500'
            href={'/login'}
          >
            Скачать для Android
          </Link> */}
        </div>
      </section>
      <section className='right hidden lg:block'>
        <Image
          className='select-none pointer-events-none'
          src={'/main-image.svg'}
          alt={'main'}
          width={592}
          height={710}
          draggable='false'
        />
      </section>
    </article>
  )
}
