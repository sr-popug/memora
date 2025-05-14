import { getThemes } from '@/entities'
import { useQuery } from '@tanstack/react-query'

export default function useThemeByID(id: string) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['theme', id],
    queryFn: () => getThemes(id),
  })
  return { data, isFetching, isError }
}
