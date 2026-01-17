import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sprout, ArrowLeft, Hammer, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
   
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-md w-full bg-card border border-border shadow-xl rounded-xl p-8 text-center relative z-10">
 
        <div className="mx-auto mb-6 relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-secondary rounded-full animate-pulse" />
          <Sprout className="h-12 w-12 text-primary relative z-10" />
          <Sun className="h-6 w-6 text-accent absolute top-0 right-0 animate-spin-slow" style={{ animationDuration: '10s' }} />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
          Sowing Seeds of Innovation
        </h1>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          We are currently cultivating this feature. Our team is working hard to bring this tool to your farm very soon.
        </p>

        <div className="w-full bg-secondary h-2 rounded-full mb-2 overflow-hidden">
          <div className="bg-primary h-full rounded-full w-3/4 animate-pulse" style={{ width: '65%' }} />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mb-8 font-medium">
          <span>Development</span>
          <span>Testing</span>
          <span className="opacity-50">Launch</span>
        </div>

    
        <div className="flex flex-col gap-3">
          <Button 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => window.history.back()}
          >
            Notify Me When Ready
          </Button>
          
          <button 
            onClick={() => navigate(-1)}
            className="w-full bg-transparent text-muted-foreground hover:text-foreground h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>

      </div>

      <p className="mt-8 text-sm text-muted-foreground font-medium flex items-center gap-2">
        <Hammer className="h-4 w-4" />
        Built with care for Indian Farmers
      </p>

    </div>
  );
};

export default ComingSoon;