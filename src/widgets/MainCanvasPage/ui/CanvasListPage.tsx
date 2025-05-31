'use client'
import changeTheme from '@/entities/Themes/api/changeTheme'
import { useAppDispatch, useAppSelector } from '@/shared/lib/react/redux'
import useThemes from '@/shared/lib/react/useThemes'
import { setThemeList } from '@/shared/store/slices/themeListSlice'
import Menu from '@/widgets/canvas/ui/TopInfo/Menu'
import { Theme } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { GripVertical } from 'lucide-react'
import Link from 'next/link'
import { DragEvent, useEffect, useState } from 'react'

export default function CanvasList() {
  const [currentTheme, setCurrentTheme] = useState<Theme>()
  const dispatch = useAppDispatch()
  const themes = useAppSelector(state => state.themeList)
  // const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['themes'],
    mutationFn: ({ id, position }: { id: string; position: number }) =>
      changeTheme({ id, position }),
    // .then(() =>
    //     queryClient.invalidateQueries({ queryKey: ['themes'] })
    //   ),
  })
  const { data } = useThemes()
  useEffect(() => {
    console.log(data, 12312312)
    if (data) dispatch(setThemeList(data))
  }, [data, dispatch])

  function dragEndHandler(e: DragEvent<HTMLLIElement>) {
    e.preventDefault()
  }
  function dragOverHandler(e: DragEvent<HTMLLIElement>) {
    e.preventDefault()
  }
  function dragLeaveHandler(e: DragEvent<HTMLLIElement>) {
    e.preventDefault()
  }
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

    dispatch(
      setThemeList(
        themes!.map(c => {
          if (theme.id === c.id) {
            return { ...c, position: currentTheme!.position }
          }
          if (currentTheme!.id === c.id) {
            return { ...c, position: theme!.position }
          }
          return c
        })
      )
    )
  }
  return (
    <ul className='overflow-y-auto overflow-x-hidden  max-h-[calc(100vh-180px)] scroll-thin-neutral '>
      {themes?.length &&
        themes
          .slice()
          ?.sort((a, b) => a.position - b.position)
          .map((theme, i) => (
            <li
              className='first:border-t flex items-center justify-between gap-x-5 gap-y-2  border-b 
               border-neutral-800 
       hover:bg-neutral-900 transition-colors min-w-52 p-2'
              key={theme.id}
              draggable={true}
              onDragEnd={e => dragEndHandler(e)}
              onDragOver={e => dragOverHandler(e)}
              onDragStart={e => dragStartHandler(e, theme, i)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDrop={e => dropHandler(e, theme, i)}
            >
              <Link href={'canvas/' + theme.id}>
                <div className='flex items-center gap-2 min-w-50'>
                  <div className='p-1 w-8 h-8 text-xl   rounded-lg flex items-center justify-center'>
                    {theme.emoji}
                  </div>
                  <h2 className='whitespace-nowrap text-xl font-bold'>
                    {theme.name}
                  </h2>
                </div>
                <p className='text-neutral-700'>{theme.id}</p>
              </Link>
              <div className='buttons flex items-center gap-2'>
                <Menu id={theme.id} name={theme.name} />
                <GripVertical className='text-neutral-800' />
              </div>
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
