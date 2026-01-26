import { api } from "@/lib/axios"

export const getHarvestedProducts = async (searchParams) => {
  const { data } = await api.get("/buyer/listing", {
    params: Object.fromEntries(searchParams.entries())
  })
  return data
}