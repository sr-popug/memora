import BuySubscribe from '@/widgets/buy-subscribe/BuySubscribe'

export default function BuySubscribePage() {
  return (
    <article className='mx-4 mt-2'>
      <h1 className='text-4xl font-bold text-center lg:text-start'>
        Купить подписку Memora+
      </h1>
      <BuySubscribe />
    </article>
  )
}
