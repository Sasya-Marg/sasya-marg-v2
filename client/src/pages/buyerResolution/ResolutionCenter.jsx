import React, { useState } from 'react'
import { AlertTriangle, ShieldCheck, FileText, Send, AlertCircle } from 'lucide-react'

const ResolutionCenter = () => {
  const [activeTab, setActiveTab] = useState('report') // 'report' | 'guide' | 'history'

  return (
    <div className='min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto'>
        
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground'>Resolution Center</h1>
          <p className='text-muted-foreground mt-2'>
            Help us keep SasyaMarg safe. Report suspicious activity or learn how to trade safely.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          
          {/* Sidebar Navigation */}
          <div className='lg:col-span-1 space-y-2'>
            <NavButton 
              active={activeTab === 'report'} 
              onClick={() => setActiveTab('report')}
              icon={<AlertTriangle className="w-4 h-4" />}
              label="Report an Issue"
            />
            <NavButton 
              active={activeTab === 'guide'} 
              onClick={() => setActiveTab('guide')}
              icon={<ShieldCheck className="w-4 h-4" />}
              label="Safety Guide"
            />
            <NavButton 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')}
              icon={<FileText className="w-4 h-4" />}
              label="My Reports"
            />
          </div>

          {/* Main Content Area */}
          <div className='lg:col-span-3'>
            <div className='bg-card border border-border rounded-lg shadow-sm p-6'>
              
              {/* TAB 1: REPORT FORM */}
              {activeTab === 'report' && <ReportIssueForm />}

              {/* TAB 2: SAFETY GUIDE */}
              {activeTab === 'guide' && <SafetyGuide />}

              {/* TAB 3: HISTORY */}
              {activeTab === 'history' && <ReportHistory />}

            </div>

            {/* Platform Disclaimer Footer */}
            <div className='mt-6 p-4 bg-muted/50 rounded-md flex gap-3 items-start border border-border'>
              <AlertCircle className='w-5 h-5 text-muted-foreground shrink-0 mt-0.5' />
              <p className='text-xs text-muted-foreground leading-relaxed'>
                <strong>Note:</strong> SasyaMarg is a discovery platform. We do not handle payments or product delivery. 
                Our Resolution Center is strictly for reporting policy violations (scams, harassment, fake data) to help us ban bad actors. 
                We cannot mediate financial disputes or recover lost funds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Sub-Components ---

const NavButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
      active 
        ? 'bg-primary/10 text-primary border border-primary/20' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`}
  >
    {icon}
    {label}
  </button>
)

const ReportIssueForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send report to backend
    alert("Report submitted! Our Trust & Safety team will review it.");
  }

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-xl font-semibold mb-1'>Report an Issue</h2>
        <p className='text-sm text-muted-foreground'>
          Let us know about suspicious behavior, fake listings, or harassment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Issue Type</label>
            <select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
              <option>Fraud / Scammer</option>
              <option>Fake Listing / Misleading Images</option>
              <option>Harassment / Abusive Chat</option>
              <option>Soliciting Off-Platform Payments (Suspicious)</option>
              <option>Other</option>
            </select>
          </div>
          
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Reference (Optional)</label>
            <input 
              type="text" 
              placeholder="Listing ID or User Name" 
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Description</label>
          <textarea 
            rows={5}
            placeholder="Please describe what happened in detail..."
            className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none'
          ></textarea>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Evidence (Screenshots/Photos)</label>
          <input 
            type="file" 
            className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium'
          />
        </div>

        <button className='inline-flex items-center justify-center rounded-md text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-6 py-2 w-full sm:w-auto'>
          <Send className='w-4 h-4 mr-2' />
          Submit Report
        </button>
      </form>
    </div>
  )
}

const SafetyGuide = () => (
  <div className='space-y-6'>
    <div>
      <h2 className='text-xl font-semibold mb-1'>Safe Trading Guidelines</h2>
      <p className='text-sm text-muted-foreground'>
        Follow these tips to protect yourself when dealing with users.
      </p>
    </div>

    <div className='space-y-4'>
      <SafetyCard 
        title="Inspect Before You Pay" 
        desc="Since SasyaMarg is a discovery platform, always inspect the crops in person or request a live video call before making any payments."
      />
      <SafetyCard 
        title="Beware of 'Advance Payment' Scams" 
        desc="Be cautious of farmers or buyers insisting on large advance payments via UPI before you have verified the product exists."
      />
      <SafetyCard 
        title="Keep Communication Visible" 
        desc="Try to use the platform's chat or keep a record of WhatsApp conversations. Screenshots serve as evidence if a user needs to be banned."
      />
      <SafetyCard 
        title="Verify Identity" 
        desc="Check if the farmer has a 'Verified' badge on SasyaMarg or ask for basic identification if the deal value is high."
      />
    </div>
  </div>
)

const SafetyCard = ({ title, desc }) => (
  <div className='p-4 border border-border rounded-lg bg-muted/20'>
    <h3 className='font-semibold text-foreground mb-1'>{title}</h3>
    <p className='text-sm text-muted-foreground'>{desc}</p>
  </div>
)

const ReportHistory = () => (
  <div className='space-y-6'>
    <div>
      <h2 className='text-xl font-semibold mb-1'>My Reports</h2>
      <p className='text-sm text-muted-foreground'>
        Track the status of issues you have raised.
      </p>
    </div>

    <div className='border border-border rounded-md divide-y divide-border'>
      {/* Example Item */}
      <div className='p-4 flex items-center justify-between'>
        <div>
          <p className='font-medium text-sm'>Report: Fake Listing - Tomatoes</p>
          <p className='text-xs text-muted-foreground'>ID: #RPT-8823 • Submitted on Oct 12, 2024</p>
        </div>
        <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200'>
          Under Review
        </span>
      </div>

      {/* Example Item */}
      <div className='p-4 flex items-center justify-between'>
        <div>
          <p className='font-medium text-sm'>Report: Abusive User - John Doe</p>
          <p className='text-xs text-muted-foreground'>ID: #RPT-7712 • Submitted on Sept 28, 2024</p>
        </div>
        <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 hover:bg-green-200'>
          Resolved (User Banned)
        </span>
      </div>
    </div>
  </div>
)

export default ResolutionCenter