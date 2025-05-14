'use client'
import { Skeleton } from '@/shared/ui/skeleton'

export default function ListSkeleton() {
  return (
    <div className='flex flex-col items-center w-50'>
      {[1, 1, 1, 1, 1].map((el, i) => (
        <div
          key={i}
          className='flex items-center w-50 gap-2 border-b-1 py-2
				  border-neutral-800'
        >
          <Skeleton className='h-8 w-8 rounded-lg' />
          <Skeleton className='h-4 w-36' />
        </div>
      ))}
    </div>
  )
}
