'use client'
import { Image } from 'lucide-react'
import NextImage from 'next/image'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

interface Props {
  setFile: Dispatch<SetStateAction<File | undefined>>
}
export default function ImageEditor({ setFile }: Props) {
  const [preview, setPreview] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setFile(file)
    }
  }

  return (
    <div className=''>
      <div className='relative'>
        {
          <input
            onChange={handleFileChange}
            ref={inputRef}
            type='file'
            id='image'
            name='image'
            accept='image/*'
            className={` 
                  opacity-0 cursor-pointer
               col-span-3 rounded-lg absolute w-full h-full z-[60]`}
          />
        }
        {preview && (
          <NextImage
            src={preview}
            width={300}
            height={200}
            className='preview w-full rounded-lg'
            alt='preview'
          />
        )}
        {!preview && (
          <div className='w-full h-50 bg-neutral-800 rounded-lg flex flex-col justify-center items-center'>
            <Image className='mb-3' width={50} height={50} />{' '}
            <h2 className='text-center font-bold text-xl'>
              Выберите изображение{' '}
            </h2>
            <p className='text-center text-neutral-600 text-sm'>
              Выберите файл с расширением .png .webp .jpg .jpeg
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
