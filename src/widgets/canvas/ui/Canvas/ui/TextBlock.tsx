import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { Handle, Position } from '@xyflow/react'
import DOMPurify from 'dompurify'
import ChangeBlock from './ChangeBlock'
import DeleteBlock from './DeleteBlock'

export default function TextBlock({
  data,
}: {
  data: { label: string; id: string; type: string }
}) {
  const cleanHTML = DOMPurify.sanitize(data.label)
  return (
    <div className='bg-neutral-900 rounded-lg py-2 px-2 border-1 border-neutral-600 max-w-sm'>
      <Handle type='target' position={Position.Top} />
      <div>
        <div dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>

        <div className=' flex justify-end gap-3 mt-2'>
          <div className='flex gap-2 '>
            <Tooltip>
              <TooltipTrigger className='cursor-pointer nodrag'>
                <DeleteBlock id={data.id} />
              </TooltipTrigger>
              <TooltipContent>Удалить</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className='cursor-pointer nodrag'>
                <ChangeBlock
                  type={data.type}
                  prevLabel={data.label}
                  id={data.id}
                />
              </TooltipTrigger>
              <TooltipContent>Изменить</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      <Handle type='source' position={Position.Bottom} />
    </div>
  )
}
