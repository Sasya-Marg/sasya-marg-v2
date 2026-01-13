import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleSchemes } from "@/hooks/scheme.hooks";
import AppLoader from "@/components/common/AppLoader";
import {
  FileText,
  CheckCircle2,
  MapPin,
  Ruler,
  Users,
  Sprout,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SchemeDetailPage = () => {
  const { id } = useParams();
  const getScheme = useGetSingleSchemes(id);

  if (getScheme.isLoading) {
    return <AppLoader />;
  }

  const scheme = getScheme.data?.data;

  if (!scheme)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Scheme not found
      </div>
    );

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge
                variant={scheme.isActive ? "default" : "destructive"}
                className="uppercase tracking-wider"
              >
                {scheme.isActive ? "Active Scheme" : "Closed"}
              </Badge>
              <Badge
                variant="outline"
                className="bg-background/50 backdrop-blur-sm"
              >
                Government Initiative
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {scheme.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {scheme.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-border/50 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">
                    Benefits & Incentives
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <p className="text-foreground font-medium text-lg">
                    {scheme.benefits}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-border/50 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Required Documents</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {scheme.documentsRequired?.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 border border-border"
                    >
                      <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center border border-input shadow-sm shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-border/50 bg-card sticky top-24 overflow-hidden">
              <CardHeader className="bg-primary/90 text-primary-foreground py-4 px-6 flex flex-row items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <CardTitle className="text-lg">Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Ruler className="h-4 w-4" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      Land Holding
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-secondary/30 border border-border">
                    <span className="text-sm">
                      Min: {scheme.eligibility.landSizeMin} Acres
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-sm">
                      Max: {scheme.eligibility.landSizeMax} Acres
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      Eligible States
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {scheme.eligibility.states?.map((state) => (
                      <Badge
                        key={state}
                        variant="secondary"
                        className="font-normal"
                      >
                        {state}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      Farmer Category
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize text-foreground">
                      {scheme.eligibility.farmerCategory} Farmers
                    </span>
                  </div>
                </div>

                {scheme.eligibility.cropTypes?.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Sprout className="h-4 w-4" />
                      <span className="text-sm font-semibold uppercase tracking-wider">
                        Specific Crops
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {scheme.eligibility.cropTypes.map((crop) => (
                        <Badge key={crop} variant="outline">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailPage;
