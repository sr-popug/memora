import { Blocks, CircleDollarSignIcon, UserCircle } from 'lucide-react'

const pagesConfig = {
  main: [
    {
      title: 'Поле тем',
      link: '/canvas',
      icon: <Blocks />,
    },
    {
      title: 'Ваш профиль',
      link: '/profile',
      icon: <UserCircle />,
    },
    {
      title: 'Купить подписку',
      link: '/buy-subscribe',
      icon: <CircleDollarSignIcon />,
    },
  ],
  admin: [],
}
export default pagesConfig
