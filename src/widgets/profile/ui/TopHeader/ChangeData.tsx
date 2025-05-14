import { Button } from '@/shared/ui/button'
import { Pen } from 'lucide-react'

export default function ChangeData() {
  return (
    <Button variant='secondary' className='cursor-pointer'>
      {' '}
      <Pen /> Изменить данные
    </Button>
  )
}
