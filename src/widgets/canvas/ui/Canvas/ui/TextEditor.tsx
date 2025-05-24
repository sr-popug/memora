'use client'

import { TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { Tooltip } from '@radix-ui/react-tooltip'
import DOMPurify from 'dompurify'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

interface Props {
  text: string
  setText: Dispatch<SetStateAction<string>>
}

export default function TextEditor({ text, setText }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [color, setColor] = useState('#ff0000')

  // Инициализация текста только один раз
  useEffect(() => {
    if (editorRef.current && text) {
      editorRef.current.innerHTML = DOMPurify.sanitize(text)
    }
  }, [])

  const handleChange = () => {
    if (editorRef.current) {
      setText(editorRef.current.innerHTML)
    }
  }

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.currentTarget.value)
  }

  return (
    <div className='border p-2 rounded shadow space-y-4 bg-neutral-900 text-neutral-100'>
      <div className='flex gap-2 justify-between mb-2'>
        <div className='flex gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => document.execCommand('bold')}
                className='px-2 py-1 bg-neutral-700 rounded hover:bg-neutral-600 cursor-pointer'
              >
                <b>B</b>
              </button>
            </TooltipTrigger>
            <TooltipContent>Жирный</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => document.execCommand('italic')}
                className='px-2 py-1 bg-neutral-700 rounded hover:bg-neutral-600 cursor-pointer'
              >
                <i>I</i>
              </button>
            </TooltipTrigger>
            <TooltipContent>Курсив</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => document.execCommand('underline')}
                className='px-2 py-1 bg-neutral-700 rounded hover:bg-neutral-600 cursor-pointer'
              >
                <u>U</u>
              </button>
            </TooltipTrigger>
            <TooltipContent>Подчеркивание</TooltipContent>
          </Tooltip>
        </div>

        <div className='flex gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => document.execCommand('foreColor', false, color)}
                className='px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded cursor-pointer'
              >
                Окрасить
              </button>
            </TooltipTrigger>
            <TooltipContent>Окрасить текст</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <input
                onChange={changeColor}
                className='h-8 m-0 w-8 rounded-sm border-none'
                type='color'
                defaultValue={'#ff0000'}
              />
            </TooltipTrigger>
            <TooltipContent>Выбрать цвет текста</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div
        ref={editorRef}
        onInput={handleChange}
        contentEditable
        className='min-h-[200px] border border-neutral-700 p-2 rounded bg-neutral-800 text-neutral-100'
        suppressContentEditableWarning={true}
      />
    </div>
  )
}
