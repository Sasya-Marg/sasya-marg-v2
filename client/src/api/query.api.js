import { api } from "@/lib/axios"



export const fetchQueries = async ({ page, filter }) => {
  const params = new URLSearchParams()
  
  // Page aur Limit bhejo
  params.append('page', page)
  params.append('limit', 10) 


  if (filter && filter !== 'all') {
    params.append('status', filter)
  }

 
  const { data } = await api.get(`/query/my?${params.toString()}`)
  return data
}


export const postQuery = async (payload) => {
    const { data } = await api.post("/query/", payload)

    return data
}