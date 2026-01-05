import React from "react";
import { ShieldAlert, ArrowLeft, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md border-border shadow-lg relative z-10 overflow-hidden">
        <div className="h-2 w-full bg-accent" />

        <CardHeader className="text-center pt-10 pb-2">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
            <ShieldAlert className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">
            Access Restricted
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-base">
            Error 403: Authorization Required
          </p>
        </CardHeader>

        <CardContent className="text-center pb-8">
          <div className="rounded-md bg-secondary/50 p-4 border border-border/50 mb-6">
            <div className="flex items-start space-x-3">
              <LockKeyhole className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <p className="text-sm text-left text-foreground/80 leading-relaxed">
                You are attempting to access a protected route used by
                <span className="font-semibold text-primary"> Sasya Marg </span>
                administrators. Your current credentials do not have the
                necessary permissions.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row sm:gap-4 pb-8 px-8">
          <Button
            variant="outline"
            className="w-full border-primary text-primary hover:bg-secondary hover:text-accent transition-colors"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back To Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
