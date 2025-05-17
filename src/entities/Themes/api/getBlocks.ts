import { Block } from '@prisma/client'
import axios from 'axios'

export default async function getBlocks(id: string) {
  return await axios.get<Block[]>(
    `${process.env.NEXTAUTH_URL}/api/blocks?id=${id}`
  )
}
