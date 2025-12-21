import { Otp } from "../models/otp.model.js";

export const generateOtp = (length = 6) => {
    const digits = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }

    return otp;
};


export const sendOtp = async (phone, purpose) => {
    const otp = generateOtp(6)

    
    await Otp.deleteMany({ phone, purpose })
    const otpDoc = await Otp.create({
        otp,
        purpose,
        phone,
        expiresAt: new Date(Date.now() + 5 * 60 * 100)
    })

    console.log(`${otp} Otp sent to ${phone}`)

    //TODO :: twilio service here to send the real otp over the phone

    return true


}