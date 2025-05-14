import AddTheme from './ui/AddTheme'
import ThemesList from './ui/ThemesList'

export default function Themes() {
  return (
    <article className='p-3 border-r-1 border-neutral-800 h-[100vh] '>
      <h3 className='font-bold text-center text-lg border-b-1 border-neutral-800 pb-[11px] min-w-50'>
        Темы
      </h3>
      <ThemesList />
      <AddTheme />
    </article>
  )
}
