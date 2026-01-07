import { changeIsContactVisisble, fetchFarmlands, fetchSingleFarmland, getFarmerDetails, updateFarmerData } from "@/api/farmer.api"
import { useMutation, useQuery } from "@tanstack/react-query"


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
        queryKey: ["farmland"],
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