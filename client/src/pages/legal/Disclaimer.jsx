import React from "react";
import { AlertTriangle, Sprout, Coins, CloudSun, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto container p-8 text-card-foreground">
        
        <div className="border-b border-border pb-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="h-8 w-8 text-destructive" />
            <h1 className="text-3xl font-bold text-foreground">Disclaimer</h1>
          </div>
          <p className="text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              General Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The information provided by <strong>Sasya Marg</strong> ("we," "us," or "our") on our website and mobile application is for general informational purposes only. All information is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
            </p>
          </section>

          <section className="bg-muted p-4 rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              AI & Crop Suggestions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our "Crop Suggestion" feature uses Artificial Intelligence (AI) and historical data to provide recommendations. However, <strong>agricultural outcomes depend on numerous unpredictable factors</strong> (micro-climate, soil health changes, pest attacks, etc.). 
              <br /><br />
              Users should consider these suggestions as <em>guidance</em> rather than absolute directives. We are not liable for any crop failure or financial loss resulting from reliance on our AI predictions. We strongly recommend consulting with local agricultural experts (Krishi Vigyan Kendra) before making major farming decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <Coins className="h-5 w-5 text-accent" />
              Mandi Prices & Financial Data
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Real-time market prices (Mandi rates) displayed on Sasya Marg are aggregated from various third-party sources and government APIs. While we strive to keep this data updated, prices in local markets can fluctuate hourly. We do not guarantee the accuracy of these prices and should not be held responsible for any trading decisions made based on this data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <CloudSun className="h-5 w-5 text-chart-2" />
              Weather Forecasts
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Weather forecasts are sourced from external meteorological services. Weather patterns are subject to rapid change. Sasya Marg is not responsible for any losses incurred due to unpredicted weather events (droughts, floods, hail) that differ from the forecast.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Government Schemes
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Information regarding Government Schemes is sourced from public domains. Sasya Marg is a private platform and is <strong>not affiliated with the Government of India</strong>. We do not guarantee eligibility or successful application for any scheme. Users are advised to verify details on official government portals.
            </p>
          </section>

        </div>

        <div className="border-t border-border mt-10 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            If you find any discrepancies in our data, please contact us at{" "}
            <a href="mailto:support@sasyamarg.com" className="text-primary hover:underline font-medium">
              support@sasyamarg.com
            </a>
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md text-sm font-medium transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Back
                </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Disclaimer;