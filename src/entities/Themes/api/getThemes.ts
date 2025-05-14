'use server'
import { Theme } from '@prisma/client'
import axios from 'axios'
import { getServerSession } from 'next-auth'

export default async function getThemes(id: string = '') {
  const session = await getServerSession()
  const url = id
    ? `${process.env.NEXTAUTH_URL}/api/themes/getOne?id=${id}`
    : `${process.env.NEXTAUTH_URL}/api/themes`
  console.log(session?.user.email)
  const data = (
    await axios.get(url, {
      params: { email: session?.user.email },
    })
  ).data as Theme[]

  return data
}
