import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchState = () => {
    return useQuery({
        queryFn: async () => {
            const { data } = await axios.get("https://www.india-location-hub.in/api/states")
            return data.states
        },
        queryKey: ["states"],
        staleTime: 1000 * 60 * 60
    })
}

export const useFetchDistrict = (stateCode) => {
    return useQuery({
        queryKey: ["district", stateCode],
        queryFn: async () => {
            const { data } = await axios.get(`https://www.india-location-hub.in/api/districts?state_code=${stateCode}`)
            return data.districts
        },
        enabled: !!stateCode
    })
}

export const useFetchTaluka = (districtCode) => {
    return useQuery({
        queryKey: ["taluka", districtCode],
        queryFn: async () => {
            const { data } = await axios.get(`https://www.india-location-hub.in/api/talukas?district_code=${districtCode}`)
            return data?.data
        },
        enabled: !!districtCode
    })
}

export const useFetchVillage = (talukaCode) => {
    return useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`https://www.india-location-hub.in/api/villages?taluka_code=${talukaCode}`)
            return data?.data
        },
        queryKey: ["village", talukaCode],
        enabled: !!talukaCode
    })
}