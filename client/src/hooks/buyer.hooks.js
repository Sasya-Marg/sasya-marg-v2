import { buyerLoginWithOtp, buyerLoginWithPassword, buyerSignup, forgotBuyerPassword } from "@/api/buyer.api"
import { useAuthStore } from "@/store/useAuthStore"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"



export const useBuyerLoginWithPassword = () => {
    const navigate = useNavigate()
    const { setUser } = useAuthStore()

    return useMutation({
        mutationFn: buyerLoginWithPassword,
        onSuccess: (res) => {
            const user = res.data
            setUser(user)
            toast.success("Login successfully")
            navigate(`/${user?.role}/dashboard`)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Login");
        }
    })
}

export const useBuyerLoginWithOtp = () => {
    const navigate = useNavigate()
    const { setUser } = useAuthStore()

    return useMutation({
        mutationFn: buyerLoginWithOtp,
        onSuccess: (res) => {
            const user = res.data
            setUser(user)
            toast.success("Login successfully")
            navigate(`/${user?.role}/dashboard`)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Login");
        }
    })
}


export const useRegisterBuyer = () => {
    const setUser = useAuthStore((state) => state.setUser)
    const navigate = useNavigate()
    return useMutation({
        mutationFn: buyerSignup,
        onSuccess: (res) => {
            const user = res.data
            setUser(user)
            toast.success("Account created! redirecting to dashboard")
            navigate(`/${user?.role}/dashboard`)
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create a account");
        }
    })
}

export const useForgotBuyerPassword = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: forgotBuyerPassword,
        onSuccess: (data) => {
            navigate(`/${data.data.role}/login`)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to change password");
        }
    })
}
