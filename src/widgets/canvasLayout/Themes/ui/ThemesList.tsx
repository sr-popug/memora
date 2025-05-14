'use client'
import useThemes from '@/shared/lib/react/useThemes'
import Link from 'next/link'
import ListSkeleton from './ListSkeleton'

export default function ThemesList() {
  const { data, isFetching } = useThemes()
  if (isFetching) {
    return <ListSkeleton />
  }
  return (
    <ul className='overflow-y-auto overflow-x-hidden max-h-[calc(100vh-120px)] scroll-thin-neutral '>
      {data?.length &&
        data
          ?.sort((a, b) => a.position - b.position)
          .map(theme => (
            // TODO: Надо будет использовать контекст меню из шад сн
            <li key={theme.id}>
              <Link
                href={`/canvas/${theme.id}`}
                className='flex items-center gap-2 border-b-1 py-2
				  border-neutral-800 hover:first:bg-neutral-900 hover:bg-neutral-800  transition-colors min-w-50'
              >
                <div className='p-1 w-8 h-8 text-lg bg-neutral-800 rounded-lg flex items-center justify-center'>
                  {theme.emoji}
                </div>
                <p className='text-nowrap text-sm'>
                  {theme.name.slice(0, 20)}
                  {theme.name.length >= 20 ? '...' : ''}
                </p>
              </Link>
            </li>
          ))}
      {!data && (
        <div className='pt-3 text-center text-neutral-600'>
          У вас ещё нету тем.
        </div>
      )}
    </ul>
  )
}
