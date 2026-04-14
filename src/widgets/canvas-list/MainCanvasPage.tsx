import AddTheme from '../canvasLayout/Themes/ui/AddTheme'
import CanvasList from './ui/CanvasListPage'

export default function MainCanvasPage() {
  return (
    <article className='m-2'>
      <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-2 lg:mb-5'>
        Ваши доски тем
      </h1>
      <CanvasList />
      <AddTheme />
    </article>
  )
}
