import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSendOtp } from "@/hooks/auth.hooks";
import {
  useFarmerLoginWithOtp,
  useFarmerLoginWithPassword,
} from "@/hooks/auth.hooks";

const LoginForm = () => {
  const [mode, setMode] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const { mutate: sendOtp, isPending: sendingOtp } = useSendOtp();
  const { mutate: loginWithOtp, isPending: otpPending } =
    useFarmerLoginWithOtp();
  const { mutate: loginWithPassword, isPending: passwordPending } =
    useFarmerLoginWithPassword();

  async function handleSendOtp() {
    const isPhoneValid = await trigger("phone");

    if (isPhoneValid) {
      const phone = getValues("phone");
      sendOtp(
        { phone, purpose: "login" },
        {
          onSuccess: () => {
            setSentOtp(true);
          },
        }
      );
    }
  }

  function handleLoginFarmer(data) {
    console.log(data);
    if (mode === "otp") {
      loginWithOtp({ phone: data.phone, otp: data.otp });
    } else if (mode === "password") {
      loginWithPassword({ phone: data.phone, password: data.password });
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">Sign In</h1>
      </div>

      <div className="flex rounded-full bg-secondary p-1">
        <button
          type="button"
          onClick={() => setMode("password")}
          className={`flex-1 rounded-full py-1.5 text-sm font-medium transition
            ${
              mode === "password"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
        >
          Password
        </button>

        <button
          type="button"
          onClick={() => setMode("otp")}
          className={`flex-1 rounded-full py-1.5 text-sm font-medium transition
            ${
              mode === "otp"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
        >
          Login with OTP
        </button>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(handleLoginFarmer)}>
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

            {mode === "otp" && (
              <Button
                variant="secondary"
                type="button"
                disabled={sentOtp || sendingOtp}
                className="h-9 shrink-0 whitespace-nowrap"
                onClick={handleSendOtp}
              >
                {sendingOtp ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : sentOtp ? (
                  "Sent"
                ) : (
                  "Get Code"
                )}
              </Button>
            )}
          </div>
          {errors.phone && (
            <p className="text-xs text-destructive mt-1 ml-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {mode === "password" && (
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="h-9 pl-9 pr-9 text-sm"
                {...register("password", {
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
            {errors.password && (
              <p className="text-xs text-destructive mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>
        )}

        {mode === "otp" && (
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                disabled={!sentOtp}
                type="text"
                placeholder="Otp"
                className="h-9 pl-9 pr-9 text-sm"
                {...register("otp", {
                  required: "Otp is required",
                  minLength: {
                    value: 6,
                    message: "Otp must contain 8 character",
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
            {errors.password && (
              <p className="text-xs text-destructive mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>
        )}

        {mode === "password" && (
          <div className="text-right">
            <Link
              to="/farmer/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          className="w-full font-bold text-md"
          disabled={isSubmitting}
        >
          {isSubmitting || otpPending || passwordPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Log In <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        New to Sayamarg?{" "}
        <Link
          to="/farmer/signup"
          className="font-medium text-accent hover:underline"
        >
          Create an Account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
