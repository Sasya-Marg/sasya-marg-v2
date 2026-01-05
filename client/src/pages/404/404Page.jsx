import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        <Card className="border-border shadow-xl bg-card/95 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 w-full h-2 bg-linear-to-r from-primary/60 via-accent to-primary/60" />
          
          <CardHeader className="pt-16 pb-2 text-center relative">
            <div className="mx-auto mb-6 relative inline-block">
              <h1 className="text-9xl font-extrabold text-primary/10 select-none tracking-widest">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-secondary p-4 rounded-full border-4 border-background shadow-sm">
                  <FileQuestion className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Page Not Found
            </h2>
          </CardHeader>

          <CardContent className="text-center px-6 md:px-8 pb-6">
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              We couldn't find the page you're looking for. The field you are trying to access might have been moved or removed.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full border border-border text-sm text-foreground/80">
              <Sprout className="w-4 h-4 text-primary" />
              <span>Sasya Marg Navigation</span>
            </div>
          </CardContent>

          <CardFooter className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:px-8 pb-10 w-full">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="w-full border-2 border-border text-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-all duration-300 font-semibold h-12"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Button 
              asChild 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 font-semibold h-12"
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}