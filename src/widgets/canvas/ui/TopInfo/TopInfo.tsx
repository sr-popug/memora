import { useAppSelector } from '@/shared/lib/react/redux'
import useThemeByID from '@/shared/lib/react/useThemeByID'
import InfoSkeleton from './InfoSkeleton'
import Menu from './Menu'

export default function TopInfo() {
  const { id } = useAppSelector(state => state.theme)
  const { data } = useThemeByID(id)

  return (
    <div>
      <article className='w-fit relative top-2 left-2 flex gap-1 bg-neutral-900 border-neutral-800 border-1 p-2 rounded-lg z-10'>
        {data && (
          <div className='flex justify-between items-center gap-5 '>
            <div className='flex gap-2'>
              <div className='w-12 h-12 rounded-lg bg-neutral-800 text-2xl flex items-center justify-center'>
                {data.emoji}
              </div>
              <div className=''>
                <h3 className='text-xl font-bold'>{data.name}</h3>
                <p className='text-neutral-700 text-sm'>{data.id}</p>
              </div>
            </div>
            <Menu id={id} />
          </div>
        )}
        {!data && <InfoSkeleton />}
      </article>
    </div>
  )
}
