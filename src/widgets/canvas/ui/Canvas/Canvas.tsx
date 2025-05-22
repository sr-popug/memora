'use client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Node,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import { useCallback, useEffect } from 'react'

import changeBlock from '@/entities/Block/api/changeBlock'
import createEdge from '@/entities/Edge/api/createEdge'
import { useAppSelector } from '@/shared/lib/react/redux'
import { Block, Edge } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import '@xyflow/react/dist/style.css'
import { nodeTypes } from './types'
interface MutateBlock {
  id: string
  x: number
  y: number
}
export default function Canvas({
  canvasData,
}: {
  canvasData: [Block[], Edge[]]
}) {
  const themeId = useAppSelector(state => state.theme.id)

  const initialNodes = canvasData[0]?.map(el => {
    if (el.content) {
      return {
        id: el.id,
        position: { x: el.positionX, y: el.positionY },
        data: { label: el.content },
        type: el.type,
      }
    }
    return {
      id: '232',
      position: { x: 500, y: 500 },
      data: { label: 'Не удается получить данные' },
    }
  })
  const initialEdges = canvasData[1]?.map(el => {
    return {
      id: el.id,
      source: el.from,
      target: el.to,
    }
  })
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const queryClient = useQueryClient()

  const { mutate: mutateBlock } = useMutation({
    mutationKey: ['blocks', themeId],
    mutationFn: ({ id, x, y }: MutateBlock) =>
      changeBlock({ id, positionX: x, positionY: y }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['blocks', themeId] })
      }),
  })

  const { mutate: mutateEdge } = useMutation({
    mutationKey: ['edges', themeId],
    mutationFn: ({ source, target }: { source: string; target: string }) =>
      createEdge({ from: source, to: target, themeId }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['edges', themeId] })
      }),
  })

  const onConnect: OnConnect = useCallback(
    params => {
      // Добавляем ребро в состояние
      setEdges(eds => addEdge(params, eds))
      mutateEdge({ source: params.source, target: params.target })
    },
    [setEdges]
  )

  useEffect(() => {
    if (!canvasData[0]) return
    const newNodes = canvasData[0]
      .filter(b => !!b.content)
      .map(b => ({
        id: b.id,
        position: { x: b.positionX, y: b.positionY },
        data: { label: b.content },
        type: b.type,
      }))
    setNodes(newNodes)
  }, [canvasData, setNodes])

  const handleNodeDragStop = (event: React.MouseEvent, node: Node) => {
    mutateBlock({ id: node.id, x: node.position.x, y: node.position.y })
  }

  return (
    <div className='w-full h-full'>
      <ReactFlow
        colorMode='dark'
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={handleNodeDragStop}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={15} size={1} />
      </ReactFlow>
    </div>
  )
}
