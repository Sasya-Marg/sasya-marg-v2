import { z } from 'zod'


export const sendOtpSchema = z.object({
    body: z.object({
        phone: z
            .string()
            .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
        purpose: z.enum(["login", "register", "forgot_password"]),
    }),
});

export const registerFarmerSchema = z.object({
    body: z.object({
        fullname: z.string().min(2, "Name too sort"),
        phone: z.coerce.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
        otp: z.string().length(6, "Otp must be of 6 digits"),
        password: z.string().min(8, "Password contains at least 8 character")
    })
})


export const loginFarmerUsingOtpSchema = z.object({
    body: z.object({
        phone: z.coerce.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
        otp: z.string().length(6, "Otp must be of 6 digits"),
    })
})

export const loginFarmerWithPasswordSchema = z.object({
    body: z.object({
        phone: z.coerce.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
        password: z.string().min(8, "Password contains at least 8 character")
    })
})

export const forgotPasswordSchema = z.object({
    body : z.object({
        phone : z.coerce.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
        newPassword : z.string().min(8, "Password must contain at least 8 character"),
        otp: z.string().length(6, "Otp must be of 6 digits")
    })
})