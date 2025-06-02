import createBlock from '@/entities/Block/api/createBlock'
import { useAppSelector } from '@/shared/lib/react/redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'

export default function useCreateBlock(type: string) {
  const { id } = useAppSelector(state => state.theme)
  const queryClient = useQueryClient()
  const project = useReactFlow()

  const mutation = useMutation({
    mutationKey: ['blocks', id],
    mutationFn: (content: string | File) => {
      const { x, y, zoom } = project.getViewport()
      const positionX = (-x + window.innerWidth / 2) / zoom
      const positionY = (-y + window.innerHeight / 2) / zoom

      return createBlock({
        content,
        themeId: id,
        positionX,
        positionY,
        type: type,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocks', id] })
    },
  })

  return mutation
}
