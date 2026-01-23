import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldAlert, Info } from 'lucide-react'

const ReturnPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className='min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <Link
            to='/'
            className='inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Home
          </Link>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl mb-2'>
            Return & Refund Policy
          </h1>
          <p className='text-muted-foreground'>Last Updated: {lastUpdated}</p>
        </div>

        <div className='bg-card border border-border rounded-lg shadow-sm p-6 sm:p-10 space-y-8'>
          <section>
            <h2 className='text-xl font-semibold mb-3 flex items-center gap-2'>
              <Info className='w-5 h-5 text-primary' />
              1. Nature of Service (Discovery Platform)
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              <strong>SasyaMarg</strong> operates exclusively as a{' '}
              <span className='text-foreground font-medium'>
                Discovery and Listing Platform
              </span>
              . Our primary function is to connect potential buyers with farmers
              by allowing users to browse crops, view harvest details, and add
              items to a wishlist. We facilitate the introduction between
              parties but do not participate in the actual trade.
            </p>
          </section>

          <hr className='border-border' />

          <section>
            <h2 className='text-xl font-semibold mb-3'>
              2. Product Responsibility & Quality
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              SasyaMarg <strong>does not own, handle, store, or inspect</strong>{' '}
              any of the agricultural products listed on this website. All
              listings are created directly by independent farmers.
            </p>
            <ul className='list-disc pl-5 text-muted-foreground space-y-2'>
              <li>
                We do not guarantee the quality, quantity, freshness, or
                existence of the crops listed.
              </li>
              <li>
                We do not endorse or promote any specific product or farmer over
                another.
              </li>
              <li>
                Any discrepancies regarding the product description and the
                actual product received are solely the responsibility of the
                farmer.
              </li>
            </ul>
          </section>

          <hr className='border-border' />

          <section>
            <h2 className='text-xl font-semibold mb-3'>
              3. Payments and Financial Dealing
            </h2>
            <div className='bg-muted/50 p-4 rounded-md border border-border mb-4'>
              <p className='text-sm font-medium text-foreground'>
                Important Notice: SasyaMarg does not handle payments.
              </p>
            </div>
            <p className='text-muted-foreground leading-relaxed'>
              We do not process transactions, hold escrow, or accept payments on
              behalf of farmers. All financial negotiations, payment terms, and
              transactions occur{' '}
              <strong>directly between the Buyer and the Farmer</strong> outside
              of the SasyaMarg platform. Consequently, SasyaMarg cannot issue
              refunds for any transaction.
            </p>
          </section>

          <hr className='border-border' />

          <section>
            <h2 className='text-xl font-semibold mb-3 flex items-center gap-2'>
              <ShieldAlert className='w-5 h-5 text-destructive' />
              4. Returns & Disputes
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              Since SasyaMarg is not a party to the sales contract between the
              buyer and the farmer:
            </p>
            <ul className='list-disc pl-5 text-muted-foreground space-y-2'>
              <li>
                <strong>No Returns via Platform:</strong> We do not have a
                mechanism to process returns or generate return shipping labels.
              </li>
              <li>
                <strong>Dispute Resolution:</strong> Any dispute regarding
                returns, refunds, or damaged goods must be settled directly with
                the farmer. We recommend buyers verify goods before making
                payments.
              </li>
              <li>
                <strong>Liability:</strong> SasyaMarg is not liable for any
                financial loss, product damage, or breach of contract arising
                from interactions initiated through our platform.
              </li>
            </ul>
          </section>

          <hr className='border-border' />

          <section>
            <h2 className='text-xl font-semibold mb-3'>
              5. Contacting Farmers
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              Buyers are encouraged to use the "Contact" or "Wishlist" features
              to initiate communication. However, the final decision to sell or
              communicate rests solely with the farmer. We do not force any
              farmer to sell or respond to inquiries.
            </p>
          </section>
        </div>

        <p className='text-center text-xs text-muted-foreground mt-8'>
          By using SasyaMarg, you acknowledge that you have read and understood
          this policy and agree that SasyaMarg is merely a facilitator of
          information.
        </p>
      </div>
    </div>
  )
}

export default ReturnPolicy
