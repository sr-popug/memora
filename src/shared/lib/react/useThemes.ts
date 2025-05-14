import { getThemes } from '@/entities'
import { useQuery } from '@tanstack/react-query'

export default function useThemes() {
  const { data, isFetching, isSuccess, isError } = useQuery({
    queryKey: ['themes'],
    queryFn: () => getThemes(''),
  })
  return { data, isFetching, isSuccess, isError }
}
