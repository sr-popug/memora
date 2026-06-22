import getThemes from '@/entities/Themes/api/getThemes';
import { api } from '@/shared/api/axiosApi';
import { Block } from '@prisma/client';
import { toast } from 'sonner';

export default async function getAllBlocks() {
  console.log(process.env.NEXT_PUBLIC_URL);

  try {
    const themes = await getThemes();
    const blocks: Block[] = [];

    themes.map(async el => {
      const data = await api.get<Block[]>(
        `${process.env.NEXT_PUBLIC_URL}/api/blocks?themeId=${el.id}`,
      );
      if (data.data) {
        blocks.push(...data.data);
      }
    });
    return blocks;
  } catch {
    toast.error('Не удалось получить данные', {
      description: 'Что-то пошло не так',
    });
  }
}
