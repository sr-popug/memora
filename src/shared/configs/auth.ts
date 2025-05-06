import { User } from '@prisma/client'
import axios from 'axios'
import { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
export const authConfig: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        let currentUser: User
        const returnedUser = await axios
          .get(`${process.env.NEXTAUTH_URL}/api/user`)
          .then(res => {
            console.log(credentials.password, 1)
            currentUser = res.data.find(
              (user: User) => user.email === credentials.email
            )
            if (currentUser.hashPassword === credentials.password) {
              console.log(1)
              const { hashPassword, ...userWithoutPass } = currentUser
              hashPassword.split('')
              return userWithoutPass as User
            }
          })
          .catch(err => console.log(err))
        return returnedUser?.email ? returnedUser : null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
}
