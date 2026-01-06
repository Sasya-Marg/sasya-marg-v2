import AppLoader from "@/components/common/AppLoader";
import {
  useChangeContactVisibility,
  useFetchFarmer,
  useUpdateFarmerData,
} from "@/hooks/farmer.hooks";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Profile = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const { data, isLoading } = useFetchFarmer();
  const { mutate: changeVisibility, isPending: changingVisibility } =
    useChangeContactVisibility();

  const { mutate: changeData, isPending: changingData } = useUpdateFarmerData();

  const [contactVisible, setContactVisible] = useState(false);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (!data) return;
    if (data.data) {
      setValue("phone", data.data.phone);
      setValue("email", data.data.email);
      setValue("fullname", data.data.fullname);
      setContactVisible(data.data.isContactVisible);
    }
  }, [data, setValue]);

  if (isLoading) {
    return <AppLoader />;
  }

  function handleToggle() {
    setContactVisible((prev) => !prev);

    changeVisibility(
      {},
      {
        onError: (err) => {
          setContactVisible((prev) => !prev);
          toast.error(
            err.response?.data?.message || "Failed to change password"
          );
        },
        onSuccess: (res) => {
          console.log(res);
          if (res?.data?.contactVisibility !== undefined) {
            setContactVisible(res.data.contactVisibility);
            toast.success(res.message);
          }
        },
      }
    );
  }

  function handleUpdateFarmerData(payload) {
    changeData(payload, {
      onSuccess: (res) => {
        const currentUser = useAuthStore.getState().user;
        console.log("res", res);
        setUser({
          ...currentUser,
          email: res.data.email,
          fullname: res.data.fullname,
        });
        toast.success(res.message, "Details updated");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Failed to update farmer details"
        );
      },
    });
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-start justify-center pt-10 px-4">
      <div className="w-full max-w-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal information
          </p>
        </div>

        <form
          className="rounded-xl border bg-card p-6 shadow-lg space-y-6"
          onSubmit={handleSubmit(handleUpdateFarmerData)}
        >
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Phone Number
            </label>
            <Input {...register("phone")} disabled />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Full Name
            </label>
            <Input
              placeholder="Enter your full name"
              {...register("fullname", {
                minLength: {
                  value: 3,
                  message: "Full name must be greater then 3 charcter",
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
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-destructive ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={isSubmitting || changingData}
          >
            {isSubmitting || changingData ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>

        <div className="flex items-center justify-between rounded-lg border p-4 my-10 bg-secondary shadow-sm">
          <div>
            <p className="text-sm font-medium text-foreground">
              Contact Visibility
            </p>
            <p className="text-xs text-muted-foreground">
              Allow buyers to see your contact details
            </p>
          </div>
          <Switch
            checked={contactVisible}
            onCheckedChange={handleToggle}
            disabled={changingVisibility}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
