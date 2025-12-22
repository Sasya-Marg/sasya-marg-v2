import bcrypt from "bcryptjs"
import { Otp } from "../models/otp.model.js"
import { ApiError } from "../utils/apiError.js"


const generateOtp = (length = 6) => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
};


export const sendOtpService = async ({ phone, purpose }) => {
  const otp = generateOtp(6)


  await Otp.deleteMany({
    phone,
    purpose,
    expiresAt: { $lt: new Date() }
  });
  const otpDoc = await Otp.create({
    otp,
    purpose,
    phone,
    expiresAt: new Date(Date.now() + 5 * 60 * 100)
  })
  if (!otpDoc) throw new ApiError(500, "Error while sending otp")

  console.log(`${otp} Otp sent to ${phone}`)

  //TODO :: twilio service here to send the real otp over the phone

  return true


}




export const verifyOtpService = async ({ phone, purpose, otp }) => {
  const otpDoc = await Otp.findOne({ phone, purpose });

  if (!otpDoc) {
    throw new ApiError(400, "OTP not found");
  }

  if (otpDoc.expiresAt < Date.now()) {
    await Otp.deleteOne({ _id: otpDoc._id });
    throw new ApiError(400, "OTP expired");
  }

  if (otpDoc.attempts >= otpDoc.maxAttempts) {
    await Otp.deleteOne({ _id: otpDoc._id });
    throw new ApiError(429, "OTP attempts exceeded");
  }

  const isValid = await bcrypt.compare(otp, otpDoc.otp);

  if (!isValid) {
    otpDoc.attempts += 1;
    await otpDoc.save();
    throw new ApiError(400, "Invalid OTP");
  }

  await Otp.deleteOne({ _id: otpDoc._id });
  return true;
};
