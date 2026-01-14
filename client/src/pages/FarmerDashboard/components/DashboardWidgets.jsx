import React from "react";
import {
  Tractor,
  Sprout,
  Leaf,
  MapPin,
  Thermometer,
  Calendar,
  CheckCircle,
  Clock,
  Layers,
  CloudSun,
  Wind,
  Droplets,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const StatsOverview = ({ stats }) => {
  const items = [
    {
      label: "Farmlands",
      value: stats.farmlandCount,
      icon: MapPin,
      color: "text-accent",
      bg: "bg-accent/20",
    },
    {
      label: "Predictions",
      value: stats.predictionCount,
      icon: Sprout,
      color: "text-chart-2",
      bg: "bg-chart-2/20",
    },
    {
      label: "Harvests",
      value: stats.preHarvestCount,
      icon: Tractor,
      color: "text-chart-1",
      bg: "bg-chart-1/20",
    },
    {
      label: "Products",
      value: stats.productCount,
      icon: Leaf,
      color: "text-destructive",
      bg: "bg-destructive/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
      {items.map((item, idx) => (
        <Card
          key={idx}
          className="border border-border shadow-sm rounded-lg overflow-hidden"
        >
          <CardContent className="p-3 md:p-4 flex items-center gap-3">
            <div
              className={`h-8 w-8 md:h-10 md:w-10 rounded-md flex items-center justify-center border border-transparent shrink-0 ${item.bg} ${item.color}`}
            >
              <item.icon className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase truncate">
                {item.label}
              </p>
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                {item.value}
              </h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const DetailedPredictionReport = ({ predictions }) => {
  const navigate = useNavigate();
  if (!predictions || predictions.length === 0)
    return (
      <Card className="h-full flex items-center justify-center p-8 text-muted-foreground border-dashed">
        No predictions available.
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => navigate("/farmer/get-suggestion")}
        >
          Get you first suggestion
        </Button>
      </Card>
    );

  const data = predictions[0];
  const { weatherSnapshot: weather, factsSnapshot: facts, result } = data;

  return (
    <Card className="col-span-1 lg:col-span-2 border border-border shadow-sm rounded-lg flex flex-col h-full overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/20 px-4 py-3 md:px-6 md:py-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="text-base md:text-lg font-bold text-primary flex items-center gap-2">
              <Sprout className="h-4 w-4 md:h-5 md:w-5" /> Crop Advisory
            </CardTitle>
            <CardDescription className="mt-1 text-xs md:text-sm">
              For: <strong>{data.farmLandSnapshot?.name}</strong>
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="w-fit bg-background text-[10px] font-mono"
          >
            {new Date(data.weatherSnapshot.fetchedAt).toLocaleDateString()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row md:divide-x border-b border-border">
          <div className="p-4 md:p-6 space-y-3 flex-1">
            <h4 className="text-xs md:text-sm font-semibold text-foreground flex items-center gap-2">
              <CloudSun className="h-4 w-4 text-muted-foreground" /> Weather
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary/20 p-2 rounded">
                <p className="text-[10px] text-muted-foreground">Temp</p>
                <p className="font-medium text-sm">
                  {Math.round(weather.temperature)}°C
                </p>
              </div>
              <div className="bg-secondary/20 p-2 rounded">
                <p className="text-[10px] text-muted-foreground">Wind</p>
                <p className="font-medium text-sm">{weather.windSpeed} km/h</p>
              </div>
              <div className="bg-secondary/20 p-2 rounded">
                <p className="text-[10px] text-muted-foreground">Humidity</p>
                <p className="font-medium text-sm">{weather.humidity}%</p>
              </div>
              <div className="bg-secondary/20 p-2 rounded">
                <p className="text-[10px] text-muted-foreground">Condition</p>
                <p className="font-medium text-sm truncate">
                  {weather.condition}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 space-y-3 flex-1 border-t md:border-t-0 border-border">
            <h4 className="text-xs md:text-sm font-semibold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" /> Soil Data
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground">Type</p>
                <span className="text-xs font-medium capitalize">
                  {facts.soilType}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Season</p>
                <span className="text-xs font-medium capitalize">
                  {facts.season}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Irrigation</p>
                <span className="text-xs font-medium capitalize">
                  {facts.irrigationLevel}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">History</p>
                <span className="text-xs font-medium capitalize truncate">
                  {facts.previousCrop || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Strategy
          </h4>
          <div className="rounded-md border border-border overflow-x-auto">
            <Table className="min-w-150">
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-37.5">Crop</TableHead>
                  <TableHead className="w-25">Score</TableHead>
                  <TableHead className="w-30">Time</TableHead>
                  <TableHead>Factors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.map((crop) => (
                  <TableRow key={crop._id}>
                    <TableCell className="font-medium text-primary py-3">
                      {crop.cropId.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-xs">{crop.score}%</span>
                        <Progress value={crop.score} className="h-1 w-12" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                        <Clock className="mr-1 h-3 w-3" />
                        {crop.durationRange.min}-{crop.durationRange.max} d
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {crop.reasons.slice(0, 2).map((reason, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-sm bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground whitespace-nowrap"
                          >
                            <CheckCircle className="mr-1 h-2 w-2 text-primary" />
                            {reason}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const FarmlandTable = ({ farmlands }) => {
  const navigate = useNavigate();
  if (!farmlands || farmlands.length < 1) {
    return (
      <Card className="h-full flex items-center justify-center p-8 text-muted-foreground border-dashed">
        No registered farmland.
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => navigate("/farmer/farmland/add")}
        >
          Add Farmland
        </Button>
      </Card>
    );
  }
  return (
    <Card className="border border-border shadow-sm rounded-lg h-full flex flex-col overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/20 px-4 py-3 shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold">Farmlands</CardTitle>
          <Badge className="bg-primary text-primary-foreground text-[10px]">
            {farmlands.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 min-h-75 relative">
        <ScrollArea className="h-full w-full whitespace-nowrap">
          <Table className="min-w-100 w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-35">Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right pr-6">Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farmlands.map((land) => (
                <TableRow key={land._id}>
                  <TableCell className="py-3">
                    <div
                      className="font-medium text-sm truncate max-w-30"
                      title={land.name}
                    >
                      {land.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {land.soilType}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    {land.location.district}
                  </TableCell>
                  <TableCell className="text-right text-xs pr-6">
                    {land.size.value} {land.size.unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const HarvestActivityLog = ({ listings }) => {
  const navigate = useNavigate();
  if (!listings || listings.length === 0)
    return (
      <Card className="h-full flex items-center justify-center p-8 text-muted-foreground border-dashed">
        No Listings available.
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => navigate("/farmer/mandi")}
        >
          List product to mandi
        </Button>
      </Card>
    );
  return (
    <Card className="border border-border shadow-sm rounded-lg h-full flex flex-col overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/20 px-4 py-3 shrink-0">
        <CardTitle className="text-base font-bold">Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 min-h-75">
        <ScrollArea className="h-full w-full">
          <div className="overflow-x-auto">
            <Table className="min-w-87.5">
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((item) => {
                  const harvest = new Date(
                    item.expectedHarvest
                  ).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                  });

                  return (
                    <TableRow key={item._id}>
                      <TableCell className="py-3">
                        <div className="font-medium text-sm">{harvest}</div>
                        <div className="text-[10px] text-muted-foreground">
                          Exp. Harvest
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={`text-[10px] h-5 ${
                            item.status === "harvested"
                              ? "bg-emerald-100 text-primary hover:bg-primary/80"
                              : "bg-amber-100 text-destructive hover:bg-destructive/80"
                          }`}
                          variant="outline"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
