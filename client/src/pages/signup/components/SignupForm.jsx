import { useState } from "react";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSendOtp, useRegisterFarmer } from "@/hooks/auth.hooks";

const FarmerSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const { mutate: sendOtp, isPending: isSending } = useSendOtp();
  const { mutate: registerUser, isPending: isRegistering } =
    useRegisterFarmer();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });

  const handleSendOtp = async () => {
    const isPhoneValid = await trigger("phone");
    if (isPhoneValid) {
      const phone = getValues("phone");
      sendOtp(
        { phone, purpose: "register" },
        {
          onSuccess: () => {
            setOtpSent(true);
          },
        }
      );
    }
  };

  const registerFarmer = async (data) => {
    const payload = {
      fullname: data.fullname,
      phone: data.phone,
      otp: data.otp,
      password: data.password,
    };

    registerUser(payload);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
        <p className="text-sm text-muted-foreground">
          Enter your details to start your journey
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(registerFarmer)}>
        <div className="space-y-1">
          <Input
            placeholder="Full Name"
            className={errors.fullname ? "border-destructive" : ""}
            {...register("fullname", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.fullname && (
            <p className="text-xs text-destructive ml-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex gap-3">
            <div className="w-full">
              <Input
                placeholder="Phone Number"
                type="tel"
                className={errors.phone ? "border-destructive" : ""}
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit number",
                  },
                })}
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              className="shrink-0"
              onClick={handleSendOtp}
              disabled={otpSent || isSending} // Disable if already sent (optional)
            >
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : otpSent ? (
                "Sent"
              ) : (
                "Get Code"
              )}
            </Button>
          </div>
          {errors.phone && (
            <p className="text-xs text-destructive ml-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Input
            disabled={!otpSent}
            placeholder="Enter Verification Code"
            className={errors.otp ? "border-destructive" : ""}
            {...register("otp", {
              required: "OTP is required",
              minLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
            })}
          />
          {errors.otp && (
            <p className="text-xs text-destructive ml-1">
              {errors.otp.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={`pr-10 ${
                errors.confirmPassword ? "border-destructive" : ""
              }`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive ml-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full font-bold text-md"
          disabled={isSubmitting}
        >
          {isSubmitting || isRegistering ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Sign Up <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        Already have account ?{" "}
        <Link
          to="/farmer/login"
          className="font-medium text-accent hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default FarmerSignupForm;
