import { createPreHarvestListing, createProductListing, getHarvestedProduct, getMyListings, getMyPreHarvestListings, updatePrice, updateProduct, updateStock } from "@/api/listing.api"
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
        queryFn: () => getMyPreHarvestListings(apiParams),
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

export const useGetProductById = (id) => {
    return useQuery({
        queryFn: () => getHarvestedProduct(id),
        queryKey: ["product", id]
    })
}

export const useUpdatePrice = () => {
    return useMutation({
        mutationFn: updatePrice,
        onSuccess: (_, variables) => {
            toast.success(`Price updated to ${variables.payload.price.value}!`)
            queryClient.invalidateQueries(['product', variables._id])
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update Price");
        }
    })
}

export const useUpdateStock = () => {
    return useMutation({
        mutationFn: updateStock,
        onSuccess: (_, variables) => {
            toast.success(`Stock updated to ${variables.payload.stock.value}!`)
            queryClient.invalidateQueries(['product', variables.productId])
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update stock");
        }
    })
}

export const useUpdateProduct = () => {
    return useMutation({
        mutationFn: updateProduct,
        onSuccess: (_, variables) => {
            toast.success(`Product details updated`)
            queryClient.invalidateQueries(['product', variables.productId])
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update product");
        }
    })
}