import Logo from '@/components/common/Logo'
import { Menu } from 'lucide-react'
import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import LogoutConfirmDialog from '@/components/common/LogoutDialog'
import LogoutButton from '@/components/common/LogoutButton'
import { useLogoutFarmer } from '@/hooks/auth.hooks'
import clsx from 'clsx'
import ThemeToggle from '@/components/common/ThemeToggle'

const BlockedUserLayout = () => {
  const [open, setOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { mutate } = useLogoutFarmer()

  function handleLogout () {
    mutate()
  }

  return (
    <div className='min-h-screen w-full'>
      <nav className='sticky top-0 z-50 w-full border-b bg-background'>
        <div className='container mx-auto px-4'>
          <div className='flex h-14 items-center justify-between'>
            <Link to='/' className='flex items-center gap-2'>
              <Logo className='w-8 md:w-10' />
              <span className='text-lg md:text-xl font-bold'>
                Sasya<span className='text-primary'>Marg</span>
              </span>
            </Link>

            <div className='hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 text-sm font-medium'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  clsx(
                    'text-muted-foreground hover:text-primary transition',
                    isActive && 'border-b-2 border-primary'
                  )
                }
              >
                Home
              </NavLink>

              <NavLink
                to='/blocked/support'
                className={({ isActive }) =>
                  clsx(
                    'text-muted-foreground hover:text-primary transition',
                    isActive && 'border-b-2 border-primary'
                  )
                }
              >
                Contact
              </NavLink>
            </div>

            <div className='hidden md:flex items-center gap-3'>
              <LogoutButton onClick={() => setIsDialogOpen(true)} />
              <ThemeToggle />
            </div>

            <div className='md:hidden'>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button size='icon' variant='ghost'>
                    <Menu className='h-5 w-5' />
                  </Button>
                </SheetTrigger>
                <ThemeToggle />

                <SheetContent side='right' className='w-64'>
                  <div className='mt-8 flex flex-col items-start px-3 gap-6 text-sm font-medium'>
                    <Link
                      to='/'
                      onClick={() => setOpen(false)}
                      className='text-muted-foreground hover:text-primary'
                    >
                      Home
                    </Link>

                    <Link
                      to='/blocked/support'
                      onClick={() => setOpen(false)}
                      className='text-muted-foreground hover:text-primary'
                    >
                      Contact
                    </Link>

                    <LogoutButton
                      onClick={() => {
                        setOpen(false)
                        setIsDialogOpen(true)
                      }}
                      className='w-full'
                    >
                      Logout
                    </LogoutButton>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <LogoutConfirmDialog
        open={isDialogOpen}
        onConfirm={handleLogout}
        onClose={() => setIsDialogOpen(false)}
      />

      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  )
}

export default BlockedUserLayout
