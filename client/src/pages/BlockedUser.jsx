import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldBan, HelpCircle, ChevronRight } from 'lucide-react'
import { useGetFarmer } from '@/hooks/farmer.hooks'
import { Button } from '@/components/ui/button'
import PageLoader from '@/components/common/PageLoader'

const BlockedUser = () => {
  const navigate = useNavigate()
  const { isLoading, data } = useGetFarmer()

  if (isLoading) {
    return <PageLoader />
  }

  const farmer = data?.data

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 font-sans text-foreground">
      <div className="w-full max-w-md bg-card rounded-(--radius) shadow-xl overflow-hidden border border-border">
        
        <div className="bg-muted/50 p-8 flex flex-col items-center justify-center text-center border-b border-border">
          <div className="h-20 w-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4 shadow-sm">
            <ShieldBan size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-destructive mb-2">
            Account Restricted
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Your access to Sasya Marg has been temporarily suspended due to the following reason.
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-muted rounded-(--radius) p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Reason Provided
              </span>
            </div>
            <p className="font-medium text-sm text-muted-foreground">
              {farmer?.blockReason || 'Violation of Community Guidelines'}
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/blocked/support')}
              className={"w-full h-13 cursor-pointer"}
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={20} />
                <span>Raise a Support Query</span>
              </div>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Reference ID: <span className="font-mono">{farmer?._id}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockedUser