import React, { useState } from "react";
import QueryStats from "./components/QueryStats";
import QueryFilterTabs from "./components/QueryFilterTab";
import QueryCard from "./components/QueryCard";
import CreateQuerySheet from "./components/CreateQuerySheet";
import { useFetchQueries } from "@/hooks/query.hooks";
import { AlertCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SupportPage = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const { data, isLoading, isError } = useFetchQueries({
    page: Number(page),
    filter
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-2 text-destructive">
        <AlertCircle className="h-8 w-8" />
        <p>Failed to load support tickets.</p>
      </div>
    );
  }

  const responseData = data.data;

  const queries = responseData?.queries || [];
  const totalPages = responseData?.pagination?.totalPages || 1;
  const hasNextPage =
    responseData?.pagination?.hasNextPage || page < totalPages;
  const hasPrevPage = responseData?.pagination?.hasPrevPage || page > 1;
//   const totalQueries = responseData?.pagination?.total || 0;

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
          <p className="text-sm text-muted-foreground">
            Track your queries and get expert advice.
          </p>
        </div>
        <CreateQuerySheet />
      </div>

      {/* Stats - Optional: Remove if backend doesn't provide total counts */}
      {/* <QueryStats openCount={...} resolvedCount={...} /> */}

      <div className="space-y-4">
        {/* Filter Tabs */}
        <QueryFilterTabs activeTab={filter} onTabChange={handleFilterChange} />

        {/* Loading Overlay or List */}
        <div className="relative `min-h-75">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center pt-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div
              className={`flex flex-col gap-3 transition-opacity ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            >
              {queries.length > 0 ? (
                queries.map((query) => (
                  <QueryCard key={query._id} query={query} />
                ))
              ) : (
                <div className="py-12 text-center border-2 border-dashed rounded-xl border-border bg-card">
                  <p className="text-muted-foreground">No tickets found.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {!isLoading && queries.length > 0 && (
          <div className="flex items-center justify-end gap-4 border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={!hasPrevPage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((old) => (hasNextPage ? old + 1 : old))}
                disabled={!hasNextPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
