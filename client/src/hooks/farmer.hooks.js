import { addPreviousCrop, changeIsContactVisisble, createFarmland, fetchFarmlands, fetchSingleFarmland, getFarmerDetails, updateFarmerData, updateFarmland } from "@/api/farmer.api"
import { queryClient } from "@/lib/queryClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"


export const useFetchFarmer = () => {
    return useQuery({
        queryKey: ["farmer-profile"],
        queryFn: getFarmerDetails
    })
}

export const useChangeContactVisibility = () => {
    return useMutation({
        mutationFn: changeIsContactVisisble,

    })
}

export const useUpdateFarmerData = () => {
    return useMutation({
        mutationFn: updateFarmerData
    })
}

export const useFetchFarmlands = () => {
    return useQuery({
        queryKey: ["farmlands"],
        queryFn: fetchFarmlands
    })
}

export const useFetchSingleFarmland = (farmlandId) => {
    return useQuery({
        queryKey: ["farmland", farmlandId],
        queryFn: () => fetchSingleFarmland(farmlandId),
        enabled: !!farmlandId,
    })
}

export const useCreateFarmland = () => {
    return useMutation({
        mutationFn: createFarmland,
    })
}

export const useAddPreviousCrop = () => {
    return useMutation({
        mutationFn: ({ farmlandId, payload }) => addPreviousCrop({ farmlandId, payload })
    })
}

export const useUpdateFarmland = () => {
    return useMutation({
        mutationFn: updateFarmland,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["farmland", variables.id]);
            queryClient.invalidateQueries(["farmlands"]);
            toast.success("Farmland updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update farmland");
        },
    })
}