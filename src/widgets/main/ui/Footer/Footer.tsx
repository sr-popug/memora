export default function Footer() {
  return (
    <footer className='py-5 max-w-[1200px] mx-auto flex justify-between items-center border-t border-t-neutral-800'>
      <p className='text-neutral-600'>
        Created by{' '}
        <a
          className='underline hover:text-neutral-500 transition-colors'
          href='https://webgeek.com'
        >
          WebGeek
        </a>
      </p>
      <p className='text-neutral-600 '>Memora 2025 © all rights reserved</p>
    </footer>
  )
}
