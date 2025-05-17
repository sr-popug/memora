import getBlocks from '@/entities/Themes/api/getBlocks'
import getEdges from '@/entities/Themes/api/getEdges'
import { useQueries } from '@tanstack/react-query'

export default function useCanvasData(themeID: string) {
  const results = useQueries({
    queries: [
      {
        queryKey: ['edges', themeID],
        queryFn: () => getEdges(themeID),
      },
      {
        queryKey: ['blocks', themeID],
        queryFn: () => getBlocks(themeID),
      },
    ],
  })
  return results
}
