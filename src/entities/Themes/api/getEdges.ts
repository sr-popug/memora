'use server'
import { Edge } from '@prisma/client'
import axios from 'axios'

export default async function getEdges(id: string) {
  return [
    {
      id: '123',
      from: '123',
      to: '456',
    },
  ]
  return await axios.get<Edge[]>(
    `${process.env.NEXTAUTH_URL}/api/edges?id=${id}`
  )
}
