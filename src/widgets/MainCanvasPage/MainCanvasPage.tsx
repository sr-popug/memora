import AddTheme from '../canvasLayout/Themes/ui/AddTheme'
import CanvasList from './ui/CanvasListPage'

export default function MainCanvasPage() {
  return (
    <article className='m-2'>
      <h1 className='text-3xl font-bold mb-5'>Ваши доски тем</h1>
      <CanvasList />
      <AddTheme />
    </article>
  )
}
