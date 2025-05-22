import getOGData from '@/shared/api/getOGData'
import { useQuery } from '@tanstack/react-query'

export default function useOGData(url: string) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['open-graph', url],
    queryFn: () => getOGData(url),
  })
  return { data, isFetching, isError }
}
