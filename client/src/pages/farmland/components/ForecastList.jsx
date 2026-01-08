import React from "react";
import { CalendarDays, CloudRain, CloudSun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
  }).format(date);
};

const ForecastList = ({ forecast }) => {
  const days = forecast?.days.slice(0, 7);
  if (!days) return null;

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-foreground">
          <CalendarDays className="h-5 w-5 text-primary uppercase" />
          How will be the week
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex w-max space-x-4 p-1">
            {days.map((day) => (
              <div
                key={day._id}
                className="flex`min-w-25 flex-col items-center justify-center rounded-xl border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary"
              >
                <span className="mb-2 text-sm font-medium text-muted-foreground">
                  {formatDate(day.date)}
                </span>

                {day.rainChance > 20 ? (
                  <CloudRain className="mb-2 h-8 w-8 text-chart-2" />
                ) : (
                  <CloudSun className="mb-2 h-8 w-8 text-accent" />
                )}

                <div className="text-lg font-bold text-foreground">
                  {Math.round(day.maxTemp)}°
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    / {Math.round(day.minTemp)}°
                  </span>
                </div>

                {day.rainChance > 0 && (
                  <Badge
                    variant="outline"
                    className="mt-2 h-5 border-chart-2 bg-(--chart-2)/10 px-1 py-0 text-[10px] text-chart-2"
                  >
                    {day.rainChance}% Rain
                  </Badge>
                )}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ForecastList;
