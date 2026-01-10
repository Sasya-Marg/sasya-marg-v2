import React, { useState } from "react";
import { BrainCircuit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchFarmlands, useGetCropSUggestion } from "@/hooks/farmer.hooks";
import ProcessSteps from "./components/ProcessStep";
import EmptyFarmlandState from "./components/EmptyFarmlandState";
import AppLoader from "@/components/common/AppLoader";
import { toast } from "sonner";
import SuggestionResults from "./components/SuggestionCard";



const CropSuggestionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestion] = useState(null);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const getSuggestion = useGetCropSUggestion();
  const { data, isLoading: fetchingFarms, isPending } = useFetchFarmlands();

  if (isLoading || isPending || fetchingFarms) {
    return <AppLoader />;
  }

  const farmlands = data?.data;

  console.log("data >>>", farmlands);
  console.log("selected farmland id ::", selectedFarmId);

  if (!farmlands || farmlands.length === 0) {
    return <EmptyFarmlandState />;
  }

  const handleGetSuggestion = () => {
    if (!selectedFarmId) return;

    getSuggestion.mutate(selectedFarmId, {
      onSuccess: (data) => {
        setSuggestion(data.data);
        toast.success(data.data.message);
        setIsLoading(false);
      },
    });
    console.log("Suggestions are ::::", suggestions);
  };

  return (
    <div className="min-h-screen w-full bg-background p-4 md:p-8 text-foreground animate-in fade-in duration-500">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm uppercase tracking-widest">
            Sasya Marg AI
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Smart Crop Advisor
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Select a farmland below to get personalized, science-backed crop
            recommendations.
          </p>
        </div>

        {/* Input Section (Only show if no result is displayed) */}
        {!suggestions && !isLoading && (
          <div className="mx-auto max-w-md space-y-4 rounded-2xl bg-card p-6 shadow-lg border border-border">
            <label className="text-sm font-medium text-muted-foreground ml-1">
              Select Your Farmland
            </label>
            <Select onValueChange={setSelectedFarmId}>
              <SelectTrigger className="w-full h-12 text-base border-input bg-background focus:ring-primary">
                <SelectValue placeholder="Choose a farm..." />
              </SelectTrigger>
              <SelectContent>
                {farmlands.map((farm) => (
                  <SelectItem key={farm._id} value={farm._id}>
                    {farm.name} ({farm.location.district})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              size="lg"
              onClick={handleGetSuggestion}
              disabled={!selectedFarmId}
              className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all hover:scale-[1.02]"
            >
              <BrainCircuit className="mr-2 h-5 w-5" /> Analyze & Suggest
            </Button>
          </div>
        )}

        {getSuggestion.isPending && (
          <div className="w-full max-w-md mx-auto mt-12 space-y-6 text-center">
            <div className="relative mx-auto h-24 w-24">
              <div className="absolute inset-0 rounded-full border-4 border-muted opacity-30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <BrainCircuit className="absolute inset-0 m-auto h-10 w-10 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Analyzing Soil & Market...
              </h3>
              <p className="text-muted-foreground">
                AI is checking optimal conditions for{" "}
                {farmlands.find((f) => f._id === selectedFarmId)?.name}...
              </p>
            </div>
          </div>
        )}

        {suggestions && (
          <div className="animate-in slide-in-from-bottom-10 duration-700">
            <SuggestionResults
              data={suggestions}
              onReset={() => setSuggestion(null)}
            />
          </div>
        )}

        {!suggestions && !getSuggestion.isPending && !isLoading && (
          <ProcessSteps />
        )}


        {isLoading && <LoadingAnalysis />}
      </div>
    </div>
  );
};

const LoadingAnalysis = () => (
  <div className="w-full max-w-md mx-auto mt-12 space-y-6 text-center">
    <div className="relative mx-auto h-24 w-24">
      <div className="absolute inset-0 rounded-full border-4 border-muted opacity-30"></div>
      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      <BrainCircuit className="absolute inset-0 m-auto h-10 w-10 text-primary animate-pulse" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-foreground">
        Analyzing Soil & Market...
      </h3>
      <p className="text-muted-foreground">
        AI is checking optimal conditions for your land.
      </p>
    </div>
  </div>
);

export default CropSuggestionPage;
