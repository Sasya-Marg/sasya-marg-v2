import React, { useState } from 'react';
import { Heart, Phone, CalendarClock, ShoppingBag, ArrowRight, CheckCircle2, User, Copy, Eye } from 'lucide-react';

const BuyerWishlistExplainer = () => {
  const [revealedId, setRevealedId] = useState(null); // Tracks which card's number is visible

  const handleReveal = (id) => {
    setRevealedId(id);
    // Optional: Reset after 3 seconds
    setTimeout(() => {
      setRevealedId(null);
    }, 4000);
  };

  return (
    <section className="bg-secondary/20 border-t border-border py-16 lg:py-24 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-background/80 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: Interactive Wishlist Demo */}
          <div className="relative order-1 lg:order-1">
            <div className="relative mx-auto w-full max-w-[380px] rounded-[3rem] border-8 border-background shadow-2xl overflow-hidden h-[720px] flex flex-col bg-slate-50 dark:bg-slate-900">
              
              {/* App Header */}
              <div className="bg-background px-6 pt-10 pb-4 border-b border-border z-20 shadow-sm">
                <div className="flex justify-between items-center">
                   <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                     <Heart className="h-5 w-5 text-red-500 fill-red-500" /> My Wishlist
                   </h3>
                   <div className="relative">
                     <ShoppingBag className="h-6 w-6 text-foreground" />
                     <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] text-primary-foreground flex items-center justify-center rounded-full font-bold">2</span>
                   </div>
                </div>
              </div>

              {/* Wishlist Content */}
              <div className="flex-grow p-4 space-y-4 overflow-y-auto custom-scrollbar relative">
                
                {/* Item 1: Pre-Harvest (Advance Booking) */}
                <div className="bg-white dark:bg-card rounded-2xl p-4 shadow-sm border border-border relative overflow-hidden group hover:border-blue-400 transition-all">
                   <div className="absolute top-0 right-0 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                      <CalendarClock className="h-3 w-3" /> Ready in 20 Days
                   </div>
                   
                   <div className="flex gap-4">
                      <div className="h-20 w-20 bg-orange-100 rounded-xl flex items-center justify-center text-3xl shrink-0">
                         🥔
                      </div>
                      <div>
                         <h4 className="font-bold text-foreground">Kufri Potato</h4>
                         <p className="text-xs text-muted-foreground mb-2">Agra Region • 500 Qtl</p>
                         <p className="text-sm font-bold text-primary">₹1,200 <span className="text-[10px] text-muted-foreground font-normal">/ Qtl (Est.)</span></p>
                      </div>
                   </div>

                   <div className="mt-4 flex gap-2">
                      <button 
                        onClick={() => handleReveal(1)}
                        className={`flex-1 h-10 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                            revealedId === 1 
                            ? 'bg-secondary text-primary border border-primary' 
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
                      >
                         {revealedId === 1 ? (
                             <>
                                <Phone className="h-3 w-3" /> +91 98765 43210
                             </>
                         ) : (
                             <>
                                <Eye className="h-3 w-3" /> Get Farmer Number
                             </>
                         )}
                      </button>
                      <button className="h-10 w-10 rounded-lg border border-border flex items-center justify-center hover:bg-red-50 hover:border-red-200 group">
                         <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      </button>
                   </div>
                </div>

                {/* Item 2: Ready Stock */}
                <div className="bg-white dark:bg-card rounded-2xl p-4 shadow-sm border border-border relative overflow-hidden group hover:border-green-400 transition-all">
                   <div className="absolute top-0 right-0 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Ready Stock
                   </div>
                   
                   <div className="flex gap-4">
                      <div className="h-20 w-20 bg-yellow-100 rounded-xl flex items-center justify-center text-3xl shrink-0">
                         🌾
                      </div>
                      <div>
                         <h4 className="font-bold text-foreground">Sharbati Wheat</h4>
                         <p className="text-xs text-muted-foreground mb-2">Mathura • 120 Qtl</p>
                         <p className="text-sm font-bold text-primary">₹2,100 <span className="text-[10px] text-muted-foreground font-normal">/ Qtl</span></p>
                      </div>
                   </div>

                   <div className="mt-4 flex gap-2">
                      <button 
                        onClick={() => handleReveal(2)}
                        className={`flex-1 h-10 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                            revealedId === 2 
                            ? 'bg-secondary text-primary border border-primary' 
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
                      >
                         {revealedId === 2 ? (
                             <>
                                <Phone className="h-3 w-3" /> +91 88000 12345
                             </>
                         ) : (
                             <>
                                <Eye className="h-3 w-3" /> Get Farmer Number
                             </>
                         )}
                      </button>
                      <button className="h-10 w-10 rounded-lg border border-border flex items-center justify-center hover:bg-red-50 hover:border-red-200 group">
                         <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      </button>
                   </div>
                </div>

                {/* Simulated Empty State or Promo */}
                <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center">
                   <p className="text-xs text-muted-foreground mb-2">Looking for something else?</p>
                   <button className="text-sm font-bold text-accent-foreground hover:underline">
                      Browse Market &rarr;
                   </button>
                </div>

              </div>
            </div>
            
            {/* Background Blob */}
            <div className="absolute bottom-10 -left-10 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl"></div>
          </div>

          {/* RIGHT SIDE: Content */}
          <div className="space-y-8 order-2 lg:order-2">
            <div>
              <div className="inline-flex items-center rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-xs font-bold text-accent-foreground mb-6">
                <ShoppingBag className="mr-2 h-3 w-3" />
                For Buyers & Traders
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                Source Smarter.<br />
                <span className="text-accent-foreground">Plan Ahead.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Secure your supply chain. Wishlist crops from specific regions and get verified contact details to negotiate best rates—even before the harvest begins.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-foreground">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">1. Curate Your List</h4>
                  <p className="text-sm text-muted-foreground mt-1">Save interesting listings to your Wishlist to track price changes and availability.</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">2. Pre-Harvest Booking</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    See crops that will be ready soon. Secure high-quality produce before it hits the open market.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">3. Connect Directly</h4>
                  <p className="text-sm text-muted-foreground mt-1">Instant access to farmer phone numbers. Call or WhatsApp to finalize the deal.</p>
                </div>
              </div>

            </div>

            <div className="pt-4">
              <a href="/buyer/register" className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-bold text-accent-foreground shadow hover:bg-accent/90 transition-all hover:gap-3 gap-2">
                Start Sourcing
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BuyerWishlistExplainer;