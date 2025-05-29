'use client'
import changeTheme from '@/entities/Themes/api/changeTheme'
import { useAppDispatch } from '@/shared/lib/react/redux'
import useThemes from '@/shared/lib/react/useThemes'
import { setThemeList } from '@/shared/store/slices/themeListSlice'
import { Theme } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { GripVertical } from 'lucide-react'
import Link from 'next/link'
import { DragEvent, useEffect, useState } from 'react'
import ListSkeleton from './ListSkeleton'

export default function ThemesList() {
  const [currentTheme, setCurrentTheme] = useState<Theme>()
  const [themes, setThemes] = useState<Theme[]>()
  const dispatch = useAppDispatch()
  // const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['themes'],
    mutationFn: ({ id, position }: { id: string; position: number }) =>
      changeTheme({ id, position }),
    // .then(() =>
    //     queryClient.invalidateQueries({ queryKey: ['themes'] })
    //   ),
  })
  const { data, isFetching } = useThemes()
  useEffect(() => {
    setThemes(data)
    console.log(data, 12312312)
    if (data) dispatch(setThemeList(data))
  }, [data, dispatch])
  if (isFetching) {
    return <ListSkeleton />
  }
  function dragEndHandler(e: DragEvent<HTMLLIElement>) {}
  function dragOverHandler(e: DragEvent<HTMLLIElement>) {
    e.preventDefault()
  }
  function dragLeaveHandler(e: DragEvent<HTMLLIElement>) {}
  function dragStartHandler(
    e: DragEvent<HTMLLIElement>,
    theme: Theme,
    i: number
  ) {
    setCurrentTheme({ ...theme, position: i })
  }
  function dropHandler(e: DragEvent<HTMLLIElement>, theme: Theme, i: number) {
    e.preventDefault()
    mutate({ id: currentTheme!.id, position: i })
    mutate({ id: theme.id, position: currentTheme!.position })
    setThemes(
      themes?.map(c => {
        if (theme.id === c.id) {
          return { ...c, position: currentTheme!.position }
        }
        if (currentTheme!.id === c.id) {
          return { ...c, position: theme!.position }
        }
        return c
      })
    )
  }

  return (
    <ul className='overflow-y-auto overflow-x-hidden  max-h-[calc(100vh-120px)] scroll-thin-neutral '>
      {themes?.length &&
        themes
          ?.sort((a, b) => a.position - b.position)
          .map((theme, i) => (
            // TODO: Надо будет использовать контекст меню из шад сн
            <li
              className='flex items-center gap-2 border-b 
               border-neutral-800 
       hover:bg-neutral-900 transition-colors min-w-52 py-2'
              key={theme.id}
              draggable={true}
              onDragEnd={e => dragEndHandler(e)}
              onDragOver={e => dragOverHandler(e)}
              onDragStart={e => dragStartHandler(e, theme, i)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDrop={e => dropHandler(e, theme, i)}
            >
              <Link
                href={`/canvas/${theme.id}`}
                className='flex items-center gap-2 min-w-50 '
              >
                <div className='p-1 w-8 h-8 text-lg bg-neutral-800  rounded-lg flex items-center justify-center'>
                  {theme.emoji}
                </div>
                <p className='whitespace-nowrap text-sm'>
                  {theme.name.slice(0, 20)}
                  {theme.name.length >= 20 ? '...' : ''}
                </p>
              </Link>
              <GripVertical className='text-neutral-800' />
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
