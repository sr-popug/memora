'use server'
import { Theme } from '@prisma/client'
import axios from 'axios'
type ChangedData = Partial<Theme>
export default async function changeTheme(data: ChangedData) {
  return (await axios.patch(`${process.env.NEXTAUTH_URL}/api/themes`, data))
    .data
}
