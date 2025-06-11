import { useAppSelector } from '@/shared/lib/react/redux'
import useThemeByID from '@/shared/lib/react/useThemeByID'
import InfoSkeleton from './ui/InfoSkeleton'
import Menu from './ui/Menu'

export default function TopInfo() {
  const { id } = useAppSelector(state => state.theme)
  const { data } = useThemeByID(id)

  return (
    <div>
      <article className='w-auto mr-4 lg:w-fit relative top-2 left-2 1 bg-neutral-900 border-neutral-800 border-1 p-2 rounded-lg z-10 '>
        {data && (
          <div className='flex w-full justify-between  items-center gap-5 '>
            <div className='flex gap-2 '>
              <div className='w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-neutral-800 text-xl lg:text-2xl flex items-center justify-center '>
                {data.emoji}
              </div>
              <div className=''>
                <h3 className='text-xl font-bold'>{data.name}</h3>
                <p className='text-neutral-700 text-[10px] lg:text-sm'>
                  {data.id}
                </p>
              </div>
            </div>
            <Menu name={data.name} id={id} />
          </div>
        )}
        {!data && <InfoSkeleton />}
      </article>
    </div>
  )
}
