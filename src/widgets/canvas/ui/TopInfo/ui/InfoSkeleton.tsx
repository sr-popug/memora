import { Skeleton } from '@/shared/ui/skeleton'

export default function InfoSkeleton() {
  return (
    <div className=''>
      <div className='flex gap-2'>
        <div>
          <Skeleton className='h-9 w-9 ' />
        </div>
        <div>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-2 w-20 mt-1' />
        </div>
      </div>
    </div>
  )
}
