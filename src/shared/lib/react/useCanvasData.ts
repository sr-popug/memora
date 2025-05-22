'use client'
import getBlocks from '@/entities/Block/api/getBlocks'
import getEdges from '@/entities/Edge/api/getEdges'
import { Block, Edge } from '@prisma/client'
import { useQueries } from '@tanstack/react-query'

export default function useCanvasData(themeID: string) {
  const results = useQueries({
    queries: [
      {
        queryKey: ['blocks', themeID],
        queryFn: () => getBlocks(themeID),
      },
      {
        queryKey: ['edges', themeID],
        queryFn: () => getEdges(themeID),
      },
    ],
  })
  console.log(results[0])
  const blocksResult = results[0]
  const edgesResult = results[1]
  return {
    blocks: blocksResult.data as Block[] | undefined,
    blocksLoading: blocksResult.isLoading,
    blocksError: blocksResult.error,
    edges: edgesResult.data as Edge[] | undefined,
    edgesLoading: edgesResult.isLoading,
    edgesError: edgesResult.error,
  }
}
