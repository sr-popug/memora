import getTheme from '@/entities/Themes/api/getTheme'
import { useQuery } from '@tanstack/react-query'

export default function useThemeByID(id: string) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['theme', id],
    queryFn: () => getTheme(id),
  })
  return { data, isFetching, isError }
}
