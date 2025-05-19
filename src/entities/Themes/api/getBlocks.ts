'use server'
import { Block } from '@prisma/client'
import axios from 'axios'

export default async function getBlocks(id: string) {
  return [
    {
      id: '123',
      positionX: 200,
      positionY: 300,
      link: '234324',
      content: 'sda',
      type: 'link',
    },
    {
      id: '345',
      positionX: 200,
      positionY: 300,
      link: '234324',
      content: 'sda',
      type: 'link',
    },
  ]
  return await axios.get<Block[]>(
    `${process.env.NEXTAUTH_URL}/api/blocks?id=${id}`
  )
}
