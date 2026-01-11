import React, { useState, useEffect } from "react";
import { useMyListing } from "@/hooks/listing.hooks";
import { useDebounce } from "@/hooks/useDebounce"; 
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Tractor
} from "lucide-react";
import ProductCard from "./HarvestedProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MyHarvestedListings = () => {
 
  const [searchTerm, setSearchTerm] = useState("");
  
 
  const debouncedSearch = useDebounce(searchTerm, 500);

  
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    moderation: undefined,
    isActive: undefined,
    
  });

  const apiParams = {
    ...filters,
    search: debouncedSearch || undefined 
  };

  const { data: productData, isLoading, isPlaceholderData } = useMyListing(apiParams);

  
  useEffect(() => {
    setFilters(prev => ({ ...prev, page: 1 }));
  }, [debouncedSearch]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }; 


  const clearAllFilters = () => {
    setSearchTerm(""); 
    setFilters({      
      page: 1, 
      limit: 10, 
      moderation: undefined, 
      isActive: undefined 
    });
  };

  const responseData = productData?.data || {};
  const listingItems = responseData.docs || responseData.products || [];
  const totalPages = responseData.totalPages || 0;
  const hasNextPage = responseData.hasNextPage;
  const hasPrevPage = responseData.hasPrevPage;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      
    
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-background p-1">
        
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search crop name..."
            className="pl-9 bg-muted/20 focus:bg-background transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

       
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          
          <Select
            value={filters.moderation || "all"} 
            onValueChange={(val) => handleFilterChange("moderation", val)}
          >
            <SelectTrigger className="w-[150px] bg-muted/20 border-dashed">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.isActive || "all"}
            onValueChange={(val) => handleFilterChange("isActive", val)}
          >
            <SelectTrigger className="w-[150px] bg-muted/20 border-dashed">
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Listings</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
           {[1, 2, 3].map((n) => (
             <div key={n} className="h-[300px] w-full rounded-xl bg-muted/20 animate-pulse" />
           ))}
        </div>
      ) : listingItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {listingItems.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>

         
          <div className="flex items-center justify-between border-t pt-4 mt-6">
            <div className="text-sm text-muted-foreground">
              Page <span className="font-medium text-foreground">{filters.page}</span> of{" "}
              <span className="font-medium text-foreground">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={!hasPrevPage || isPlaceholderData}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={!hasNextPage || isPlaceholderData}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </>
      ) : (
       
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-xl bg-muted/5">
          <div className="h-14 w-14 bg-muted/50 rounded-full flex items-center justify-center mb-4">
            <Tractor className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No harvested crops found</h3>
          <p className="text-muted-foreground mt-2 text-sm max-w-sm">
            We couldn't find any listings matching your current filters.
          </p>
          <Button 
            variant="link" 
            className="mt-2 text-primary font-medium"
            onClick={clearAllFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyHarvestedListings;