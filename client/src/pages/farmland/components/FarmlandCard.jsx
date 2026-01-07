import React from "react";
import { MapPin, Ruler, ArrowUpRight, Sprout, SquareStack } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FarmlandCard = ({ farmland }) => {
  const navigate = useNavigate();

  return (
    <Card className="group relative w-full max-w-sm overflow-hidden border-0 bg-card text-card-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute top-0 h-32 w-full bg-linear-to-br from-primary to-primary/80">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent opacity-20 blur-xl"></div>
        <div className="absolute left-4 top-4">
          <Badge className="bg-accent text-accent-foreground hover:bg-accent/90 border-none px-3 py-1 shadow-sm">
            {farmland.farmingType}
          </Badge>
        </div>
      </div>

      <CardContent className="relative pt-24 pb-4 px-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-md ring-4 ring-card bg-secondary">
          <Sprout className="h-6 w-6 text-primary" />
        </div>

        <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
          <MapPin className="h-3 w-3" />
          {farmland?.location?.district}, {farmland?.location?.state}
        </div>

        <h3 className="mb-4 text-2xl font-bold text-foreground tracking-wide group-hover:text-primary transition-colors">
          {farmland.name}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col rounded-lg bg-secondary p-3 transition-colors group-hover:bg-muted">
            <div className="mb-1 flex items-center text-primary">
              <Ruler className="mr-1.5 h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                Area
              </span>
            </div>
            <span className="text-lg font-medium text-foreground">
              {farmland?.size?.value} {farmland?.size?.unit}
            </span>
          </div>

          <div className="flex flex-col rounded-lg bg-secondary p-3 transition-colors group-hover:bg-muted">
            <div className="mb-1 flex items-center text-primary">
              <SquareStack className="mr-1.5 h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                Soil
              </span>
            </div>
            <span className="text-lg font-medium text-foreground truncate">
              {farmland?.soilType}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-border bg-muted/30 px-6 py-3">
        <Button
          onClick={() => navigate(`/farmer/farmland/${farmland._id}`)}
          variant="secondary"
          className="w-full justify-between p-0 text-primary hover:bg-transparent hover:text-primary/80 font-medium"
        >
          View Farmland
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FarmlandCard;
