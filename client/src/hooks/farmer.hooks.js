import { addPreviousCrop, changeIsContactVisisble, createFarmland, fetchFarmlands, fetchSingleFarmland, getCropSuggestion, getFarmerDetails, getSuggestionHisory, toggleFarmActiveStatus, updateFarmerData, updateFarmland } from "@/api/farmer.api"
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
            queryClient.invalidateQueries(["farmland", variables._id]);
            queryClient.invalidateQueries(["farmlands"]);
            toast.success("Farmland updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update farmland");
        },
    })
}

export const useToggleFarmActiveSataus = () => {
    return useMutation({
        mutationFn: toggleFarmActiveStatus,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['farmland', variables._id])
            queryClient.invalidateQueries(["farmlands"])
        },
    })
}

export const useGetCropSUggestion = () => {
    return useMutation({
        mutationFn: getCropSuggestion,
        onSuccess: () => {
            queryClient.invalidateQueries(["suggestion-history"])
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update farmland");
        }
    })
}


export const useGetSuggestionHisory = () => {
    return useQuery({
        queryKey: ["suggestion-history"],
        queryFn: getSuggestionHisory
    })
}