import { Phone, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFarmerForgotPassword, useSendOtp } from "@/hooks/auth.hooks";

const ForgotPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setotpSent] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const { mutate: sendOtp, isPending: sendingOtp } = useSendOtp();
  const { mutate: forgotPassword, isPending: changingPassword } =
    useFarmerForgotPassword();

  const handleSendOtp = async () => {
    const isPhoneValid = await trigger("phone");
    if (isPhoneValid) {
      const phone = getValues("phone");
      sendOtp(
        {
          phone,
          purpose: "forgot_password",
        },
        {
          onSuccess: () => {
            setotpSent(true);
          },
        }
      );
    }
  };

  const handleFarmerForgotPassword = (data) => {
    const payload = {
      phone: data.phone,
      otp: data.otp,
      newPassword: data.newPassword,
    };
    forgotPassword(payload);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Reset Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Verify your phone number to reset password
        </p>
      </div>

      <form
        className="space-y-5"
        onSubmit={handleSubmit(handleFarmerForgotPassword)}
      >
        <div>
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone Number"
                className="h-9 pl-9 text-sm w-full"
                {...register("phone", {
                  required: "Phone is Required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit number",
                  },
                })}
              />
            </div>

            <Button
              variant="secondary"
              type="button"
              className="h-9 shrink-0 whitespace-nowrap"
              onClick={handleSendOtp}
            >
              {sendingOtp ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : otpSent ? (
                "sent"
              ) : (
                "Get OTP"
              )}
            </Button>
          </div>
          {errors.phone && (
            <p className="text-xs text-destructive mt-1 ml-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              disabled={!otpSent}
              type="text"
              placeholder="OTP"
              className="h-9 pl-9 text-sm"
              {...register("otp", {
                required: "Otp is required",
                minLength: {
                  value: 6,
                  message: "Otp must contain 8 character",
                },
              })}
            />
          </div>
          {errors.otp && (
            <p className="text-xs text-destructive mt-1 ml-1">
              {errors.otp.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              disabled={!otpSent}
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="h-9 pl-9 pr-9 text-sm"
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must contain 8 character",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-xs text-destructive mt-1 ml-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              disabled={!otpSent}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              className="h-9 pl-9 pr-9 text-sm"
              {...register("confirmNewPassword", {
                required: "Password is required",
                validate: (value, formValues) => {
                  return (
                    value === formValues.newPassword || "Password do not match"
                  );
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmNewPassword && (
            <p className="text-xs text-destructive mt-1 ml-1">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full font-bold text-md">
          {isSubmitting || changingPassword ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Set New Password <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
