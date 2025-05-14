'use client'
import emoji from '@/shared/lib/emoji'
import { Button } from '@/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'

export default function SelectEmoji({
  emojiState,
  setEmojiState,
}: {
  emojiState: string
  setEmojiState: Dispatch<SetStateAction<string>>
}) {
  const [open, setOpen] = useState(false)

  function setEmoji(e: MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement
    const emoji = target.closest('button')?.id
    e.preventDefault()
    setEmojiState(prev => emoji || prev)
    handleEmojiSelect()
  }
  const handleEmojiSelect = () => {
    setOpen(false)
  }
  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='cursor-pointer w-9'>
          {emojiState}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        avoidCollisions={false}
        forceMount
        className='w-80 z-[9999]'
      >
        <ul
          onClick={setEmoji}
          className='flex h-[150px] overflow-auto flex-wrap gap-1'
        >
          {emoji.map((el, i) => (
            <li key={i}>
              <Button
                id={el}
                variant='outline'
                className='w-8 h-8 cursor-pointer'
              >
                {el}
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
