'use server'
import { Theme } from '@prisma/client'
import axios from 'axios'
import { getServerSession } from 'next-auth'

export default async function getThemes() {
  const session = await getServerSession()

  console.log(session?.user.email)
  const data = (
    await axios.get(`${process.env.NEXTAUTH_URL}/api/themes`, {
      params: { email: session?.user.email },
    })
  ).data

  return data as Theme[]
}
