'use client';
import useBlocks from '@/shared/lib/react/useBlocks';
import useThemes from '@/shared/lib/react/useThemes';
import { Theme } from '@prisma/client';
import { SearchIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import SearchMenu from './SearchMenu';

export default function Search() {
  const [value, setValue] = useState<string>('');
  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    setVisible(true);
  }
  const path = usePathname();
  const { data: dataThemes } = useThemes();
  const { data: dataBlocks } = useBlocks();
  const [visible, setVisible] = useState(false);
  const [themes, setThemes] = useState<Theme[] | undefined>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setThemes(
        dataThemes?.filter(val =>
          val.name.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [value, dataThemes, dataBlocks]);

  useEffect(() => {
    setVisible(false);
  }, [path]);

  useEffect(() => {
    const closeMenu = () => {
      setVisible(false);
    };
    document.body.addEventListener('click', closeMenu);

    return () => document.body.removeEventListener('click', closeMenu);
  }, []);

  return (
    <article className='relative'>
      <article className=' flex items-center bg-neutral-800 p-2 py-1 rounded-lg '>
        <input
          onClick={() => setVisible(true)}
          value={value}
          onChange={changeInput}
          type='text'
          placeholder='Поиск...'
          className='outline-none w-50 lg:w-80'
        />
        <button className=''>
          <SearchIcon />
        </button>
      </article>
      {value && visible && <SearchMenu themes={themes} />}
    </article>
  );
}
