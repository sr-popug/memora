'use client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import { useCallback } from 'react'

import { Block, Edge } from '@prisma/client'
import '@xyflow/react/dist/style.css'

// const initialNodes = [
//   {
//     id: '1',
//     type: 'resizableNode',
//     position: { x: 200, y: 200 },
//     data: { label: <div>1</div> },
//   },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// ]
// const initialEdges = [{ id: 'e1-2', animated: true, source: '1', target: '2' }]

export default function Canvas({
  canvasData,
}: {
  canvasData: [Block[], Edge[]]
}) {
  const initialNodes = canvasData[0].map(el => {
    if (el.link) {
      return {
        id: el.id,
        position: { x: el.positionX, y: el.positionY },
        data: el.link,
      }
    }
  })
  const initialEdges = canvasData[1].map(el => {
    return {
      id: el.id,
      source: el.from,
      target: el.to,
    }
  })
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect: OnConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    [setEdges]
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
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={15} size={1} />
      </ReactFlow>
    </div>
  )
}
