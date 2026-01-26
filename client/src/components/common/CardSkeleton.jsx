import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function CardSkeleton ({ count }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
      {Array.from({ length: count }).map((_, id) => (
        <Card className='w-full ' key={id}>
          <CardHeader>
            <Skeleton className='aspect-video w-full bg-secondary' />
          </CardHeader>
          <CardContent className={"flex flex-col gap-3"}>
            <Skeleton className='h-4 w-full bg-secondary' />
            <Skeleton className='h-4 w-1/2 bg-secondary' />
          </CardContent>
          <CardFooter className={'flex items-center justify-between'}>
            <Skeleton className={'w-30 h-8 rounded-full bg-secondary'} />
            <Skeleton className={'w-15 h-8 bg-secondary'} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default CardSkeleton
