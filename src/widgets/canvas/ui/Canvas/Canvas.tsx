'use client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Node,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import { MouseEvent, useCallback, useEffect } from 'react'

import changeBlock from '@/entities/Block/api/changeBlock'
import createEdge from '@/entities/Edge/api/createEdge'
import deleteEdge from '@/entities/Edge/api/deleteEdge'
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
    mutationFn: (params: Connection) =>
      createEdge({ from: params.source, to: params.target, themeId }).then(
        res => {
          console.log(res)
          setEdges(eds => addEdge({ ...params, id: res!.data.id }, eds))
          queryClient.invalidateQueries({ queryKey: ['edges', themeId] })
        }
      ),
  })
  const { mutate: deleteEdgeMutate } = useMutation({
    mutationKey: ['deleted-edges', themeId],
    mutationFn: (id: string) => deleteEdge(id),
  })

  const onConnect: OnConnect = useCallback(
    params => {
      mutateEdge(params)
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
        data: { label: b.content, id: b.id, type: b.type },
        type: b.type,
      }))
    setNodes(newNodes)
  }, [canvasData, setNodes])

  const handleNodeDragStop = (event: React.MouseEvent, node: Node) => {
    mutateBlock({ id: node.id, x: node.position.x, y: node.position.y })
  }
  const onEdgeClick = useCallback(
    (event: MouseEvent<Element, MouseEvent>, edge: Edge) => {
      event.stopPropagation() // Не передаём дальше
      setEdges(eds => eds.filter(e => e.id !== edge.id))
      deleteEdgeMutate(edge.id)
    },
    []
  )
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
        onEdgeClick={onEdgeClick}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={15} size={1} />
      </ReactFlow>
    </div>
  )
}
