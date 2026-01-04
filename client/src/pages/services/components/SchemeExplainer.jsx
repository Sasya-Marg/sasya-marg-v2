import React from 'react';
import { Landmark, ArrowRight, FileCheck, ShieldCheck, Banknote, Search, ChevronRight } from 'lucide-react';

const SchemeExplainer = () => {
  return (
    <section className="bg-background border-t border-border py-16 lg:py-24 overflow-hidden relative">
      
      {/* Background Decor - Yellow Accent */}
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[500px] bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: Explainer Content */}
          <div className="space-y-8">
            <div>
              {/* Badge using Accent (Yellow) and Accent Foreground (Dark Green) */}
              <div className="inline-flex items-center rounded-full border border-accent/50 bg-accent/20 px-3 py-1 text-xs font-bold text-accent-foreground mb-6">
                <Landmark className="mr-2 h-3 w-3" />
                Government Support
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                Never Miss a <br />
                <span className="text-yellow-600 dark:text-yellow-400">Subsidy or Scheme.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Billions of rupees in agricultural aid go unclaimed every year. Sasya-Marg aggregates Central and State schemes, filters them by your profile, and guides you on how to apply.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-foreground">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">1. Smart Search</h4>
                  <p className="text-sm text-muted-foreground mt-1">Filter schemes by category: Loans, Insurance, Machinery Subsidies, or Direct Cash Transfer.</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-foreground">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">2. Eligibility Check</h4>
                  <p className="text-sm text-muted-foreground mt-1">Our system matches your land size and crop type against scheme criteria instantly.</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-foreground">
                  <Banknote className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">3. Application Guide</h4>
                  <p className="text-sm text-muted-foreground mt-1">Get a checklist of required documents (Aadhar, Khatouni) and direct application links.</p>
                </div>
              </div>

            </div>

            <div className="pt-4">
              <a href="/schemes" className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-bold text-accent-foreground shadow hover:bg-accent/90 transition-all hover:gap-3 gap-2">
                Browse Schemes
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Static Visual */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-[380px] rounded-[3rem] border-8 border-muted bg-background shadow-2xl overflow-hidden h-[650px] flex flex-col">
              
              {/* App Header - Using Accent (Yellow) Background with Dark Text */}
              <div className="bg-accent px-6 pt-10 pb-6 shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-accent-foreground/10 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <span className="font-bold text-accent-foreground">Scheme Finder</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-accent-foreground">Recommended for You</h3>
                <p className="text-accent-foreground/80 text-xs">Based on your 2 Acre Land Profile</p>
              </div>

              <div className="p-4 flex-grow flex flex-col overflow-hidden relative bg-slate-50 dark:bg-background">
                
                <div className="space-y-3 h-full overflow-y-auto custom-scrollbar pb-4">
                  
                  {/* Card 1 */}
                  <div className="bg-white dark:bg-card p-4 rounded-2xl shadow-sm border border-border transition-all hover:border-accent/50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <h4 className="font-bold text-foreground text-sm mb-1">PM Kisan Samman Nidhi</h4>
                      <p className="text-xs text-muted-foreground mb-3">Financial benefit of ₹6,000/- per year.</p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white dark:bg-card p-4 rounded-2xl shadow-sm border border-border transition-all hover:border-accent/50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Insurance</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <h4 className="font-bold text-foreground text-sm mb-1">PM Fasal Bima Yojana</h4>
                      <p className="text-xs text-muted-foreground mb-3">Crop insurance against non-preventable natural risks.</p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white dark:bg-card p-4 rounded-2xl shadow-sm border border-border transition-all hover:border-accent/50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Subsidy</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <h4 className="font-bold text-foreground text-sm mb-1">Agri-Machinery Subsidy</h4>
                      <p className="text-xs text-muted-foreground mb-3">Up to 40% subsidy on buying new tractors.</p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white dark:bg-card p-4 rounded-2xl shadow-sm border border-border opacity-75">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-secondary text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">Loan</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <h4 className="font-bold text-foreground text-sm mb-1">Kisan Credit Card (KCC)</h4>
                      <p className="text-xs text-muted-foreground mb-3">Short-term credit for cultivation needs.</p>
                  </div>

                </div>

              </div>
            </div>
            
            {/* Background Blob */}
            <div className="absolute top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SchemeExplainer;