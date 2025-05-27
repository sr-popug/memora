import useOGData from '@/shared/lib/react/useOGData'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { Handle, Position } from '@xyflow/react'
import { ClipboardCopy, Link } from 'lucide-react'
import Image from 'next/image'
import NextLink from 'next/link'
import { toast } from 'sonner'
import ChangeBlock from './ChangeBlock'
import DeleteBlock from './DeleteBlock'

export default function LinkBlock({
  data,
}: {
  data: { label: string; id: string; type: string }
}) {
  const { data: openGraphData } = useOGData(data.label)

  function handleCopyButton() {
    navigator.clipboard
      .writeText(data.label)
      .then(() => toast('Ссылка скопирована в буфер обмена'))
  }
  return (
    <div className='bg-neutral-900 rounded-lg py-2 px-2 border-1 border-neutral-600 max-w-sm'>
      <Handle type='target' position={Position.Top} />
      <div>
        <Tooltip>
          <TooltipTrigger>
            <div className='flex items-center gap-2'>
              <Image
                src={`https://www.google.com/s2/favicons?sz=24&domain_url=${data.label}`}
                width={14}
                height={14}
                alt='favicon'
              />
              <p className='text-sm text-neutral-500'>
                {data.label.split('https://').join('').split('/')[0]}
              </p>
            </div>
          </TooltipTrigger>
          {openGraphData && (
            <div>
              <h3 className='mb-2 font-bold '>{openGraphData?.data.ogTitle}</h3>
              {openGraphData?.data.ogImage &&
                openGraphData?.data.ogImage[0].url && (
                  <Image
                    src={openGraphData?.data.ogImage[0].url}
                    width={220}
                    height={120}
                    className='w-[220px] h-[120px] overflow-hidden'
                    alt='og-image'
                  />
                )}
            </div>
          )}

          <TooltipContent>
            {' '}
            <p>{data.label.split('https://')}</p>
          </TooltipContent>
        </Tooltip>

        <div className='min-w-40 flex justify-between gap-3 mt-2'>
          <div className='flex gap-2 '>
            <Tooltip>
              <TooltipTrigger className='cursor-pointer nodrag'>
                <DeleteBlock id={data.id} />
              </TooltipTrigger>
              <TooltipContent>Удалить</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <ChangeBlock
                  type={data.type}
                  prevLabel={data.label}
                  id={data.id}
                />
              </TooltipTrigger>
              <TooltipContent className='cursor-pointer nodrag'>
                Изменить
              </TooltipContent>
            </Tooltip>
          </div>
          <div className='flex gap-2 align-center'>
            <Tooltip>
              <TooltipTrigger>
                <NextLink
                  href={data.label}
                  className='cursor-pointer nodrag'
                  target='_blank'
                >
                  <Link
                    width={20}
                    height={20}
                    className=' text-neutral-600 hover:text-neutral-300 transition-colors'
                  />
                </NextLink>
              </TooltipTrigger>
              <TooltipContent>Перейти по ссылке</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className='cursor-pointer nodrag'
                  onClick={handleCopyButton}
                >
                  <ClipboardCopy
                    width={20}
                    height={20}
                    className=' text-neutral-600 hover:text-neutral-300 transition-colors'
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>Копировать ссылку</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      <Handle type='source' position={Position.Bottom} />
    </div>
  )
}
