import { SearchIcon } from 'lucide-react'

export default function Search() {
  return (
    <article className='flex items-center bg-neutral-800 p-2 py-1 rounded-lg '>
      <input type='text' placeholder='Поиск' className='outline-none' />
      <button className='cursor-pointer'>
        <SearchIcon />
      </button>
    </article>
  )
}
