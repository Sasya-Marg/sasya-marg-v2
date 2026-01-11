import { createPreHarvestListing, createProductListing, getMyListings, getMyPreHarvestListings } from "@/api/listing.api"
import { queryClient } from "@/lib/queryClient"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
export const useMyListing = (filters) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: () => getMyListings(filters),
        placeholderData: keepPreviousData

    })
}

export const useMyPreHarvestListing = (apiParams) => {
    return useQuery({
        queryKey: ['pre-harvest-products', apiParams],
        queryFn: ()=> getMyPreHarvestListings(apiParams),
        placeholderData: keepPreviousData
    })
}

export const useCreateProductListing = () => {
    return useMutation({
        mutationFn: createProductListing,
        onSuccess: () => {
            queryClient.invalidateQueries(['products'])
            toast.warning("Product is under review , wait for confirm!")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update farmland");
        }
    })
}

export const useCreatePreHarvestListing = () => {
    return useMutation({
        mutationFn: createPreHarvestListing,
        onSuccess: () => {
            queryClient.invalidateQueries(['pre-harvest-products'])
            toast.warning("Product is under review , wait for confirm!")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update farmland");
        }
    })
}