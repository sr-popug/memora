import { Theme } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Params {
  themes?: Theme[];
}

export default function SearchMenu({ themes }: Params) {
  return (
    <div className='absolute min-w-80 max-h-[calc(100vh-48px)] overflow-auto scroll-thin-neutral z-100 left-0 top-10 bg-background rounded-sm p-5 border-1 border-neutral-600'>
      {themes?.length ? (
        themes.map((el, i) => {
          return (
            <Link
              href={`/canvas/${el.id}`}
              className='block pt-2 hover:bg-neutral-900'
              key={el.id}
            >
              <h6 className='flex items-center justify-between'>
                {el.emoji} {el.name} <ArrowRight width={15} color='#555' />
              </h6>
              {i != themes.length - 1 ? (
                <div className='bg-neutral-700 mt-2 h-[1px] w-full'></div>
              ) : (
                <div className='pb-2'></div>
              )}
            </Link>
          );
        })
      ) : (
        <p className='text-neutral-600'>Ничего не найдено</p>
      )}
    </div>
  );
}
