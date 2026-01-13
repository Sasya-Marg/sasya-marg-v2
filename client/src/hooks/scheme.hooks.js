import { getAllScheme, getSingleScheme } from "@/api/scheme.api"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export const useGetAllSchemes = (apiParams) => {
    return useQuery({
        queryKey: ['schemes', apiParams],
        queryFn: () => getAllScheme(apiParams),
        placeholderData: keepPreviousData,
        enabled: Boolean(apiParams)
    })
}

export const useGetSingleSchemes = (id) => {
    return useQuery({
        queryKey: ['schemes', id],
        queryFn: () => getSingleScheme(id),
        placeholderData: keepPreviousData,
        enabled: Boolean(id)
    })
}