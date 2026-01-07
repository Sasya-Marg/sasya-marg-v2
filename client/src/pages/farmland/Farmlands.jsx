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
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-linear-to-br from-[#F7FBEF] via-[#F1F7E8] to-[#FFF4D6]">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur border-[#E4ECD6] shadow-xl rounded-2xl">
          <CardHeader className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#EAF1DB] text-[#5C6F2B]">
              <Sprout className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl text-[#364219]">
              No Farmland Added Yet
            </CardTitle>
            <CardDescription className="text-[#5F6F3A]">
              Add your farmland details to unlock accurate crop predictions,
              weather insights, and better market visibility.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={() => navigate("/farmer/farmlands/add")}
              className="gap-2 rounded-xl bg-[#5C6F2B] px-6 py-3 text-white hover:bg-[#4E5F24]"
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
          <FarmlandCard
            farmland={farm}
            key={farm._id}
          />
        ))}

        <AddFarmlandCard />
      </div>
    </div>
  );
};

export default Farmlands;
