import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sprout,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Loader2
} from 'lucide-react'
import { useFetchFarmlands } from '@/hooks/farmer.hooks'
import { useDebounce } from '@/hooks/useDebounce'
import AppLoader from '@/components/common/AppLoader'
import FarmlandCard from './components/FarmlandCard'
import AddFarmlandCard from './components/AddFarmlandCard'
import FarmlandFilter from './components/Farmlandfillters'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

const Farmlands = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('active')

  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, status])

  const { data, isLoading, isFetching } = useFetchFarmlands({
    page,
    limit: 9,
    search: debouncedSearch,
    status
  })

  const farmlands = data?.data?.farmland || []
  const pagination = data?.data?.pagination || {
    totalPages: 1,
    page: 1,
    total: 0
  }

  const handleFilterChange = newStatus => {
    setStatus(newStatus)
  }

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (isLoading && !data) {
    return <AppLoader />
  }

  if (
    !isLoading &&
    farmlands.length === 0 &&
    !debouncedSearch &&
    status === 'active' &&
    pagination.total === 0
  ) {
    return (
      <div className='relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4'>
        <Card className='relative w-full max-w-lg overflow-hidden rounded-(--radius) border bg-card text-card-foreground shadow-xl'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--secondary),transparent)] opacity-50' />
          <CardHeader className='relative flex flex-col items-center gap-4 px-6 pt-10 text-center'>
            <div className='relative flex h-20 w-20 items-center justify-center rounded-full bg-secondary ring-1 ring-border shadow-inner'>
              <Sprout className='h-10 w-10 text-primary' strokeWidth={1.5} />
            </div>
            <CardTitle className='text-2xl font-bold tracking-tight text-foreground mt-4'>
              Start Your Farming Journey
            </CardTitle>
            <CardDescription className='max-w-xs text-base leading-relaxed text-muted-foreground'>
              Add your first farmland to unlock AI-driven crop guidance.
            </CardDescription>
          </CardHeader>
          <CardContent className='relative flex justify-center px-6 pb-10'>
            <Button
              onClick={() => navigate('/farmer/farmland/add')}
              size='lg'
              className='rounded-xl bg-primary text-primary-foreground'
            >
              Add Farmland
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background space-y-6 p-6 animate-in fade-in duration-500'>

      <div className='sticky top-0 z-20 bg-background/80 backdrop-blur-md pt-2 pb-4 border-b border-border/50 -mx-6 px-6'>
        <FarmlandFilter
          searchTerm={searchTerm} 
          onSearch={setSearchTerm} 
          onFilterChange={handleFilterChange}
          currentFilter={status}
        />
      </div>

      <div className='relative min-h-100'>
     
        {isFetching && (
          <div className='absolute inset-0 z-10 bg-background/50 backdrop-blur-[1px] flex items-center justify-center rounded-xl transition-all duration-300'>
            <div className='bg-card p-3 rounded-full shadow-lg border border-border'>
              <Loader2 className='h-6 w-6 animate-spin text-primary' />
            </div>
          </div>
        )}

        <div className='grid place-items-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
          {farmlands.length > 0 ? (
            farmlands.map(farm => (
              <FarmlandCard farmland={farm} key={farm._id} />
            ))
          ) : (

            <div className='col-span-full py-20 text-center flex flex-col items-center justify-center text-muted-foreground bg-muted/30 rounded-2xl border border-dashed border-border w-full'>
              <Sprout className='h-12 w-12 opacity-20 mb-4' />
              <p className='text-lg font-medium'>No farmlands found</p>
              <p className='text-sm opacity-70'>
                {debouncedSearch
                  ? `No results for "${debouncedSearch}"`
                  : 'Try adjusting your filters'}
              </p>
            </div>
          )}

          {status === 'active' && <AddFarmlandCard />}
        </div>
      </div>


      {pagination.totalPages > 1 && (
        <div className='flex items-center justify-center gap-2 py-8 mt-6 border-t border-border'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isFetching}
            className='h-10 w-10 rounded-(--radius)'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>

          <span className='text-sm font-medium text-muted-foreground px-2'>
            Page {page} of {pagination.totalPages}
          </span>

          <Button
            variant='outline'
            size='icon'
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.totalPages || isFetching}
            className='h-10 w-10 rounded-(--radius)'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  )
}

export default Farmlands
