import { api } from "@/lib/axios"


export const getFarmerDetails = async () => {
    const { data } = await api.get("/farmer/me")
    return data
}

export const changeIsContactVisisble = async () => {
    const { data } = await api.put("/farmer/change/contact-visibility")
    return data
}
export const updateFarmerData = async (payload) => {
    const { data } = await api.put("/farmer/change/farmer-data", payload)
    return data
}