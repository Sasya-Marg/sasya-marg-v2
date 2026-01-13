import { api } from "@/lib/axios"


export const getAllScheme = async (apiParams) => {
    const { data } = await api.get(`/farmer/schemes/all`, { params: apiParams })
    return data
}

export const getSingleScheme = async (id) => {
    const { data } = await api.get(`/farmer/schemes/${id}`)
    return data
}