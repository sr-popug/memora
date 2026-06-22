import getAllBlocks from '@/entities/Block/api/getAllBlocks';
import { useQuery } from '@tanstack/react-query';

export default function useBlocks() {
  const { data, isFetching, isSuccess, isError } = useQuery({
    queryKey: ['all-blocks'],
    queryFn: () => getAllBlocks(),
  });
  return { data, isFetching, isSuccess, isError };
}
