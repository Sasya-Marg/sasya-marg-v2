import React, { useEffect, useState } from "react";
import {
  Search,
  FileText,
  CheckCircle2,
  LayoutGrid,
  Sprout,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemeCard from "./components/SchemeCard";
import { useFetchFarmlands } from "@/hooks/farmer.hooks";
import { toast } from "sonner";
import { useGetAllSchemes } from "@/hooks/scheme.hooks";
import { useDebounce } from "@/hooks/useDebounce";
import AppLoader from "@/components/common/AppLoader";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal",
];

const GovernmentSchemesPage = () => {
  const [viewMode, setViewMode] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 3,
    state: undefined,
  });

  const apiParams = {
    ...filters,
    search: search || undefined,
  };

  const { data: farmlandData } = useFetchFarmlands();
  const getScheme = useGetAllSchemes(apiParams);

  useEffect(() => {
    if (viewMode === "eligible" && selectedFarmId) {
      setFilters((prev) => ({
        ...prev,
        farmlandId: selectedFarmId,
        page: 1,
      }));
    } else {
      setFilters((prev) => {
        const { farmlandId, ...rest } = prev;
        return { ...rest, page: 1 };
      });
    }
  }, [viewMode, selectedFarmId]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [search]);

  const farmlands = farmlandData?.data || [];

  if (getScheme.isError) {
    toast.error("Failed to load schemes. Please try again.");
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
      page: 1,
    }));
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedFarmId("");
    setFilters({
      page: 1,
      limit: 3,
      state: undefined,
    });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (getScheme.isLoading) {
    return <AppLoader />;
  }

  const responseData = getScheme.data?.data;
  const schemes = responseData?.schemes || [];
  const total = responseData?.pagination?.total || 0;
  const totalPages = responseData?.pagination?.totalPages || 0;
  const hasNextPage = filters.page < totalPages;
  const hasPrevPage = filters.page > 1;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-in fade-in duration-500">
      <div className="mx-auto container space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border pb-6">
          <div className="space-y-2">
            <Badge className="bg-accent/10 text-accent-foreground border-accent/20 dark:bg-accent/80 px-3 py-1 mb-2">
              Government Support
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Schemes & Subsidies
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Find financial aid, insurance, and equipment subsidies tailored for your farm.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 text-right">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{total}</p>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Active Schemes
              </p>
            </div>
          </div>
        </div>

        <div className="sticky top-2 z-10 space-y-4">
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50 p-1">
              <TabsTrigger value="all">
                <LayoutGrid className="mr-2 h-4 w-4" /> Browse All
              </TabsTrigger>
              <TabsTrigger value="eligible">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Check Eligibility
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="bg-background/80 backdrop-blur-md border border-border rounded-xl p-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {viewMode === "all" ? (
                <>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search schemes..."
                      className="pl-9 h-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select
                    value={filters.state}
                    onValueChange={(val) => handleFilterChange("state", val)}
                  >
                    <SelectTrigger className="w-40 h-10">
                      <SelectValue placeholder="Filter by State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {INDIAN_STATES.map((st) => (
                        <SelectItem key={st} value={st}>{st}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {filters.state && (
                    <Button variant="ghost" onClick={clearAllFilters}>
                      Clear
                    </Button>
                  )}
                </>
              ) : (
                <div className="w-full flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <Select value={selectedFarmId} onValueChange={setSelectedFarmId}>
                    <SelectTrigger className="w-full md:max-w-md h-10">
                      <SelectValue placeholder="Select a Farmland..." />
                    </SelectTrigger>
                    <SelectContent>
                      {farmlands.map((farm) => (
                        <SelectItem key={farm._id} value={farm._id}>
                          {farm.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>

        {schemes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((scheme) => (
                <SchemeCard key={scheme._id} scheme={scheme} />
              ))}
            </div>

            <div className="flex items-center justify-between border-t pt-4 mt-6">
              <div className="text-sm">
                Page {filters.page} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={!hasPrevPage}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Prev
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={!hasNextPage}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl">
            <Search className="h-10 w-10 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-bold">
              {viewMode === "eligible" && !selectedFarmId
                ? "Select a Farmland"
                : "No Schemes Found"}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentSchemesPage;
