import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Heart, Phone, Store, Truck, CalendarClock, CheckCircle2, PackagePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketExplainer = () => {
  const [demoStep, setDemoStep] = useState('input');
  const [listingType, setListingType] = useState('ready'); // 'ready' or 'pre-harvest'

  const runDemo = () => {
    setDemoStep('posting');
    setTimeout(() => {
      setDemoStep('buyer_view');
    }, 2000);
  };

  const resetDemo = () => {
    setDemoStep('input');
  };

  return (
    <section className="bg-secondary/20 border-t border-border py-16 lg:py-24 overflow-hidden relative">
      
      <div className="absolute top-0 left-0 w-200 h-200 bg-background/80 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: Interactive Demo (Swapped order) */}
          <div className="relative order-1 lg:order-1">
            <div className="relative mx-auto w-full max-w-95 rounded-[3rem] border-8 border-background shadow-2xl overflow-hidden h-180 flex flex-col bg-slate-50 dark:bg-slate-900">
              
              <div className="bg-background px-6 pt-10 pb-4 border-b border-border z-20 shadow-sm">
                <div className="flex justify-between items-center">
                   <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                     <ShoppingBag className="h-5 w-5 text-accent" /> Market Place
                   </h3>
                   <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                     <span className="text-xs font-bold">JD</span>
                   </div>
                </div>
              </div>

              <div className="grow flex flex-col relative overflow-hidden">
                
                {demoStep === 'input' && (
                  <div className="p-6 space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="text-center mb-2">
                      <h4 className="font-bold text-lg">Sell Your Harvest</h4>
                      <p className="text-xs text-muted-foreground">Fill details to list on Global Mandi</p>
                    </div>

                    <div className="bg-white dark:bg-card p-4 rounded-2xl shadow-sm border border-border space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase">Crop Name</label>
                        <input type="text" value="Fresh Onion (Red)" readOnly className="w-full text-sm font-medium border-b border-border pb-1 bg-transparent" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground uppercase">Price / Qtl</label>
                          <input type="text" value="₹ 2,400" readOnly className="w-full text-sm font-medium border-b border-border pb-1 bg-transparent text-green-600" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground uppercase">Quantity</label>
                          <input type="text" value="50 Qtl" readOnly className="w-full text-sm font-medium border-b border-border pb-1 bg-transparent" />
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase mb-2 block">Crop Status</label>
                        <div className="flex bg-secondary rounded-lg p-1">
                          <button 
                            onClick={() => setListingType('ready')}
                            className={`flex-1 text-xs font-semibold py-2 rounded-md transition-all ${listingType === 'ready' ? 'bg-white shadow text-primary' : 'text-muted-foreground'}`}
                          >
                            Ready Stock
                          </button>
                          <button 
                            onClick={() => setListingType('pre-harvest')}
                            className={`flex-1 text-xs font-semibold py-2 rounded-md transition-all ${listingType === 'pre-harvest' ? 'bg-white shadow text-blue-600' : 'text-muted-foreground'}`}
                          >
                            Pre-Booking
                          </button>
                        </div>
                      </div>
                      
                      {listingType === 'pre-harvest' && (
                         <div className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md flex items-center gap-2">
                            <CalendarClock className="h-4 w-4" /> Available in approx 20 Days
                         </div>
                      )}
                    </div>

                    <button 
                      onClick={runDemo}
                      className="w-full h-12 rounded-xl bg-foreground text-background font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 mt-auto"
                    >
                      Post to Mandi
                    </button>
                  </div>
                )}

                {demoStep === 'posting' && (
                  <div className="absolute inset-0 z-30 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                     <div className="h-16 w-16 bg-accent rounded-2xl flex items-center justify-center mb-4 animate-bounce">
                        <Truck className="h-8 w-8 text-accent-foreground" />
                     </div>
                     <h4 className="font-bold text-xl">Listing Crop...</h4>
                     <p className="text-sm text-muted-foreground">Notifying buyers in your region</p>
                  </div>
                )}

                {demoStep === 'buyer_view' && (
                  <div className="p-6 h-full bg-slate-100 dark:bg-secondary/20 animate-in slide-in-from-right duration-500">
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-xs font-bold text-muted-foreground uppercase">Buyer View</span>
                       <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Live
                       </span>
                    </div>

                    <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
                       <div className="h-40 bg-orange-100 relative flex items-center justify-center">
                          <span className="text-6xl">🧅</span>
                          {listingType === 'pre-harvest' ? (
                             <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                <CalendarClock className="h-3 w-3" /> Advance Booking
                             </div>
                          ) : (
                             <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                <CheckCircle2 className="h-3 w-3" /> Ready to Ship
                             </div>
                          )}
                          <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
                             <Heart className="h-4 w-4" />
                          </button>
                       </div>
                       
                       <div className="p-4">
                          <div className="flex justify-between items-start mb-1">
                             <h4 className="font-bold text-lg text-foreground">Nasik Red Onion</h4>
                             <span className="font-bold text-primary">₹2,400<span className="text-xs text-muted-foreground font-normal">/Qtl</span></span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                             <Store className="h-3 w-3" /> Farmer: Jai Kisan • Agra
                          </p>

                          <div className="grid grid-cols-2 gap-2 mb-4">
                             <div className="bg-secondary/50 p-2 rounded-lg text-center">
                                <span className="text-[10px] text-muted-foreground block">Quantity</span>
                                <span className="font-semibold text-sm">50 Qtl</span>
                             </div>
                             <div className="bg-secondary/50 p-2 rounded-lg text-center">
                                <span className="text-[10px] text-muted-foreground block">Quality</span>
                                <span className="font-semibold text-sm">A+ Grade</span>
                             </div>
                          </div>

                          <button className="w-full h-10 rounded-lg bg-foreground text-background font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                             <Phone className="h-4 w-4" /> Contact Farmer
                          </button>
                       </div>
                    </div>

                    <div className="mt-6 text-center">
                       <button 
                         onClick={resetDemo} 
                         className="text-xs font-semibold text-muted-foreground hover:text-accent underline"
                       >
                         Create Another Listing
                       </button>
                    </div>

                  </div>
                )}

              </div>
            </div>
            
            <div className="absolute bottom-10 -left-10 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl"></div>
          </div>

          {/* RIGHT SIDE: Explainer Steps (Swapped order) */}
          <div className="space-y-8 order-2 lg:order-2">
            <div>
              <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-foreground mb-6">
                <Store className="mr-2 h-3 w-3" />
                Direct Farm-to-Buyer
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                Your Digital Mandi,<br />
                <span className="text-accent-foreground">Open 24/7.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Skip the middlemen. List your harvest directly on Sasya-Marg. You can even secure buyers for <strong>Pre-Harvest crops</strong> weeks before you cut them.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-foreground">
                  <PackagePlus className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">1. Post Your Crop</h4>
                  <p className="text-sm text-muted-foreground mt-1">Upload photos, set your price per Quintal, and define quantity.</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">2. Choose Availability</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Harvested:</strong> Ready to ship immediately.<br/>
                    <strong>Pre-Harvest:</strong> Open for advance booking.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">3. Connect & Sell</h4>
                  <p className="text-sm text-muted-foreground mt-1">Buyers wishlist your crop and contact you directly via phone or WhatsApp.</p>
                </div>
              </div>

            </div>

            <div className="pt-4">
              <Link href="/market-place" className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-medium text-accent-foreground shadow hover:bg-accent/90 transition-all hover:gap-3 gap-2">
                Visit Market Place
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MarketExplainer;