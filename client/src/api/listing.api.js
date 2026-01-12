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

export const getHarvestedProduct = async (id) => {
    const { data } = await api.get(`/product/${id}`)
    return data
}

export const updatePrice = async ({ productId, payload }) => {
    const { data } = await api.patch(`/product/update-price/${productId}`, payload)
    return data
}

export const updateStock = async ({ productId, payload }) => {
    const { data } = await api.patch(`/product/update-stock/${productId}`, payload)
    return data
}


export const updateProduct = async ({ productId, payload }) => {
    const { data } = await api.patch(`/product/${productId}`, payload)
    return data
}

export const getPreHarvestedProductById = async (id) => {
    const {data} = await api.get(`/product/pre-harvest/${id}`)
    return data
}

export const updatePreHarestProduct = async({productId, payload})=>{
    const {data} = await api.patch(`/product/pre-harvest/${productId}`, payload)
    return data
}