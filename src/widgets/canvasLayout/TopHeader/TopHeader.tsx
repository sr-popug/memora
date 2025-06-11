import NavMenu from './ui/NavMenu'
import Search from './ui/Search'
import UserInfo from './ui/UserInfo'

export default function TopHeader() {
  return (
    <header className='flex items-center py-2 px-4 justify-between border-b-1 border-neutral-800'>
      <Search />
      <UserInfo />
      <NavMenu />
    </header>
  )
}
