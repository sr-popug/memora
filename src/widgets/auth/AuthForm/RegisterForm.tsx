'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import registerAPI from './api/register'
import ButtonGitHub from './ButtonGitHub'

export default function RegisterForm() {
  const router = useRouter()

  const [previewImg, setPreviewImg] = useState('')
  const [img, setImg] = useState<File>()
  const [loading, setLoading] = useState(false)

  const changeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImg(e.target.files[0])
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
    } else {
      setPreviewImg('')
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.delete('image')

    if (img) formData.append('image', img)
    if (formData.get('password') !== formData.get('confirm-password')) {
    }

    await registerAPI
      .create(formData, img)
      .then(() => {
        router.push('/auth')
      })
      .catch(() => {
        setLoading(false)
      })
  }
  return (
    <div className='flex flex-col gap-3 w-full'>
      <form className='flex flex-col  gap-3 w-[500px] ' onSubmit={handleSubmit}>
        <div className=' flex justify-center items-center'>
          <div className='relative w-[150px] h-[150px]'>
            <input
              className='cursor-pointer  absolute w-[150px] h-[150px] opacity-0'
              onChange={changeFileInput}
              type='file'
              name='image'
              id='image'
              accept='.png, .webp, .jpg, .jpeg'
              required
            />
            {previewImg && (
              <Image
                className='rounded-full w-[150px] h-[150px]'
                src={previewImg}
                alt='preview'
                width={150}
                height={150}
              />
            )}
            {!previewImg && (
              <div className='absolute bg-neutral-800 border-2 border-solid border-neutral-500 w-[150px] h-[150px] -z-1 flex flex-col text-center justify-center rounded-full'>
                <p className='text-lg'>Выберите изображение</p>
                <p className='text-neutral-500 text-[10px]'>
                  Типы файлов: <br /> .png, .webp, .jpg, .jpeg{' '}
                </p>
              </div>
            )}
          </div>{' '}
        </div>

        <input
          className='p-3 rounded-lg bg-neutral-800'
          name='name'
          minLength={5}
          type='name'
          placeholder='Имя'
          required
        />
        <input
          className='p-3 rounded-lg bg-neutral-800'
          name='email'
          type='email'
          placeholder='Ваш эл. адрес'
          required
        />
        <input
          className='p-3 rounded-lg bg-neutral-800'
          name='password'
          minLength={8}
          type='password'
          placeholder='Введите пароль'
          required
        />
        <input
          minLength={8}
          className='p-3 rounded-lg bg-neutral-800  c'
          name='confirm-password'
          type='password'
          placeholder='Повторите пароль'
          required
        />
        <button
          className='p-3 rounded-lg bg-neutral-950 font-bold hover:bg-black  cursor-pointer'
          disabled={loading}
          type='submit'
        >
          {!loading && 'Регистрация'}
          {loading && 'Загрузка'}
        </button>
      </form>

      <ButtonGitHub />
    </div>
  )
}
