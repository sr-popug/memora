'use server'
import axios from 'axios'
interface ChangedData {
  id: string
  emoji: string
  name: string
}
export default async function changeTheme(data: ChangedData) {
  return (await axios.patch(`${process.env.NEXTAUTH_URL}/api/themes`, data))
    .data
}
