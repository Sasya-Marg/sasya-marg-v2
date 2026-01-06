import { forgotPassword, loginFarmerWithOtp, loginFarmerWithPasword, logoutFarmer, registerFarmer, sendOtp } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";


export const useSendOtp = () => {
    return useMutation({
        mutationFn: sendOtp,
        onSuccess: () => {
            toast.success("Otp send successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        },
    })
}

export const useRegisterFarmer = () => {
    const setUser = useAuthStore((state) => state.setUser)
    const navigate = useNavigate()
    return useMutation({
        mutationFn: registerFarmer,
        onSuccess: (data) => {
            setUser(data.data)
            toast.success("Account created successfully")
            navigate(`/farmer/dashboard`)
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create a account");
        }
    })
}

export const useLogoutFarmer = () => {
    const { clearUser } = useAuthStore()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: logoutFarmer,
        onSuccess: () => {
            clearUser()
            toast.success("Logout successfully")
            navigate(`/`)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Logout");
        }
    })
}

export const useFarmerLoginWithOtp = () => {
    const { setUser } = useAuthStore()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: loginFarmerWithOtp,
        onSuccess: (data) => {
            setUser(data.data)
            toast.success("Login successfully")
            navigate(`/farmer/dashboard`)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Login");
        }
    })
}

export const useFarmerLoginWithPassword = () => {
    const { setUser } = useAuthStore()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: loginFarmerWithPasword,
        onSuccess: (data) => {
            setUser(data.data)
            toast.success("Login successfully")
            navigate(`/farmer/dashboard`)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Login");
        }
    })
}

export const useFarmerForgotPassword = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data) => {
            console.log("Password changed...", data)
            navigate(`/${data.data.role}/login`)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to change password");
        }
    })
}