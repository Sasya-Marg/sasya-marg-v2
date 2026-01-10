import React from "react";
import { CloudSun, TrendingUp, Beaker, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProcessSteps = () => {
  return (
    <div className="mt-12">
      <h3 className="text-center text-lg font-semibold text-muted-foreground mb-6">
        How Sasya Marg AI Works
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StepCard
          icon={<Beaker className="h-8 w-8 text-accent" />}
          title="Soil Analysis"
          desc="We check soil match to our crop database."
        />
        <StepCard
          icon={<CloudSun className="h-8 w-8 text-chart-2" />}
          title="Weather Forecast"
          desc="Predictions for rainfall & temp for next 14 days initially."
        />
        <StepCard
          icon={<MapPin className="h-8 w-8 text-primary" />}
          title="Automatic Location fetch"
          desc="Use location to get more data about your land."
        />
      </div>
    </div>
  );
};

const StepCard = ({ icon, title, desc }) => (
  <Card className="border-border/40 bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
    <CardContent className="pt-6 text-center space-y-3">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-primary/80">
        {icon}
      </div>
      <h3 className="font-bold text-base text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </CardContent>
  </Card>
);

export default ProcessSteps;
