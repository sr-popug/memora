'use server'
import { Theme } from '@prisma/client'
import axios from 'axios'
import { getServerSession } from 'next-auth'

export default async function getTheme(id: string) {
  const session = await getServerSession()
  console.log(session?.user.email)
  const data = (
    await axios.get(`${process.env.NEXTAUTH_URL}/api/themes/getOne?id=${id}`, {
      params: { email: session?.user.email },
    })
  ).data

  return data as Theme
}
