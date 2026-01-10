import React from "react";
import { Ruler, Layers, Droplets, IndianRupee, Sprout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({ icon: Icon, colorVar, label, value = "N/A", subValue }) => (
  <Card className="group relative overflow-hidden border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
    <div
      className="absolute -bottom-6 -right-6 opacity-[0.5] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
      style={{ color: `var(${colorVar})` }}
    >
      <Icon size={120} strokeWidth={1.5} />
    </div>

    <CardContent className="relative z-10 flex flex-col items-start gap-3 p-5">
      <div
        className="rounded-full p-2 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
        style={{
          backgroundColor: `color-mix(in srgb, var(${colorVar}), transparent 90%)`,
          color: `var(${colorVar})`,
        }}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground uppercase">
          {label}
        </p>
        <p className="text-xl font-bold capitalize text-foreground">
          {value || "N/A"}
        </p>
        {subValue && (
          <p className="mt-0.5 text-xs font-medium capitalize text-muted-foreground/80">
            {subValue || "N/A"}
          </p>
        )}
      </div>
    </CardContent>
  </Card>
);

const FarmlandStatsGrid = ({ data }) => {
  if (!data) return null;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumSignificantDigits: 3,
    }).format(amount);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-foreground uppercase">
        Land Details
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {data.previousCrop && (
          <StatCard
            icon={Sprout}
            colorVar="--destructive"
            label="Previous Crop"
            value={`${data.previousCrop.name} `}
            subValue={`Season: ${data.previousCrop.season}`}
          />
        )}

        <StatCard
          icon={Ruler}
          colorVar="--primary"
          label="Total Area"
          value={`${data.size.value} ${data.size.unit}`}
        />

        <StatCard
          icon={Layers}
          colorVar="--chart-5"
          label="Soil Type"
          value={data.soilType}
        />

        <StatCard
          icon={Droplets}
          colorVar="--chart-2"
          label="Water Source"
          value={data.water.source}
          subValue={`Type: ${data.water.type}`}
        />

        <StatCard
          icon={IndianRupee}
          colorVar="--accent"
          label="Est. Budget"
          value={formatCurrency(data.budget)}
        />

        {data?.lastPredictCrop?.cropId?.name && (
          <StatCard
            icon={Sprout}
            colorVar="--accent"
            label="Last crop Suggestion"
            value={data?.lastPredictCrop?.cropId?.name}
            subValue={`Score: ${data?.lastPredictCrop?.score}`}
          />
        )}
      </div>
    </div>
  );
};

export default FarmlandStatsGrid;
