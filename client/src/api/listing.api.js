import { api } from "@/lib/axios"


export const getMyListings = async (filters) => {
    const { data } = await api.get("/product/me", { params: filters })
    return data
}

export const getMyPreHarvestListings = async (apiParams) => {
    const { data } = await api.get("/product/pre-harvest/my", { params: apiParams })
    return data
}

export const createProductListing = async (payload) => {
    const { data } = await api.post("/product/", payload)
    return data
}

export const createPreHarvestListing = async (payload) => {
    const { data } = await api.post("/product/pre-harvest/", payload)
    return data
}