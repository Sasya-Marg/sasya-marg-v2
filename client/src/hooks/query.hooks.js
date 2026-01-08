import { fetchQueries, postQuery } from "@/api/query.api"
import { queryClient } from "@/lib/queryClient"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useFetchQueries = ({ page, filter }) => {
    return useQuery({
        queryKey: ["queries", page, filter],
        queryFn: () => fetchQueries({ page, filter }),
        staleTime: 5000,
        keepPreviousData: true
    })
}

export const usePostQuery = () => {
    return useMutation({
        mutationFn: postQuery,
        onSuccess: () => {
            queryClient.invalidateQueries(['queries'])
        }
    })
}