import React from "react";
import { useFetchFarmlands } from "@/hooks/farmer.hooks";
import AppLoader from "@/components/common/AppLoader";
import FarmlandCard from "./components/FarmlandCard";
import AddFarmlandCard from "./components/AddFarmlandCard";
import { Sprout, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Farmlands = () => {
  const { data, isLoading } = useFetchFarmlands();
  const navigate = useNavigate();

  if (isLoading) {
    return <AppLoader />;
  }

  const farmlands = data.data;

  if (!farmlands || farmlands.length < 1) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 ">
        <Card className="relative w-lg overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lg">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-secondary/70 via-transparent to-accent/20" />

          <CardHeader className="relative flex flex-col items-center gap-4 px-6 pt-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary ring-1 ring-primary/30 shadow-sm">
              <Sprout className="h-8 w-8 text-primary" />
            </div>

            <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
              No Farmland Added
            </CardTitle>

            <CardDescription className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Add your farmland to unlock smarter crop guidance, weather
              insights, and better market visibility.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative flex justify-center px-6 pb-8">
            <Button
              onClick={() => navigate("/farmer/farmland/add")}
              className="rounded-xl bg-primary px-6 py-2.5 text-primary-foreground shadow-md transition hover:bg-primary/90 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring"
            >
              Add Farmland
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="grid place-items-center grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 bg-background">
        {farmlands.map((farm) => (
          <FarmlandCard farmland={farm} key={farm._id} />
        ))}

        <AddFarmlandCard />
      </div>
    </div>
  );
};

export default Farmlands;
