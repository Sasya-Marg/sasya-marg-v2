import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageCirclePlus,
  Sprout,
  Cloud,
  Wrench,
  IndianRupee,
  Loader2,
  CheckCircle2,
  PackageSearch ,
  MessageSquareMore
} from "lucide-react";
import { toast } from "sonner";
import { usePostQuery } from "@/hooks/query.hooks";
import { useAuthStore } from "@/store/useAuthStore";

const CreateQuerySheet = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore.getState();


  const { mutate, isPending } = usePostQuery();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      inquiry: "crop",
      priority: "medium",
      subject: "",
      message: "",
    },
  });

  const watchedInquiry = watch("inquiry");

  const onSubmit = (data) => {
    const payload = {
      ...data,
      fullname: user?.fullname || "You",
      email: user?.email || "N/A",
      phone: user?.phone || "N/A",
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Query posted ! wait for reply");
        setOpen(false);
        reset();
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to send OTP");
      },
    });
  };

  const inquiryTypes = [
    { id: "crop", label: "Crop Issue", icon: Sprout, color: "text-chart-1" },
    { id: "weather", label: "Weather", icon: Cloud, color: "text-chart-2" },
    { id: "product", label: "Product", icon: PackageSearch, color: "text-accent" },
    {
      id: "pricing",
      label: "Mandi Price",
      icon: IndianRupee,
      color: "text-chart-3",
    },
    {
      id: "technical",
      label: "App Help",
      icon: Wrench,
      color: "text-chart-4",
    },
    {
      id: "other",
      label: "Other Issue",
      icon: MessageSquareMore,
      color: "text-chart-5",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg gap-2">
          <MessageCirclePlus className="h-4 w-4" />
          <span className="hidden sm:inline">Ask Question</span>
          <span className="sm:hidden">Ask</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="h-[90vh] rounded-t-xl sm:h-full sm:max-w-md sm:rounded-none sm:side-right overflow-y-auto"
      >
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-2xl font-bold text-foreground">
            Raise a Ticket
          </SheetTitle>
          <SheetDescription>
            Describe your issue clearly. Our experts will get back to you
            shortly.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-8 p-4">
          {/* Custom Inquiry Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Inquiry Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {inquiryTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setValue("inquiry", type.id)}
                  className={`
                        cursor-pointer flex flex-col items-center justify-center rounded-lg border p-4 transition-all
                        ${
                          watchedInquiry === type.id
                            ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary"
                            : "border-border bg-card hover:bg-secondary/50"
                        }
                    `}
                >
                  <type.icon
                    className={`mb-2 h-6 w-6 ${
                      watchedInquiry === type.id ? "text-primary" : type.color
                    }`}
                  />
                  <span
                    className={`text-xs font-semibold ${
                      watchedInquiry === type.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {type.label}
                  </span>
                  {watchedInquiry === type.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

    
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Subject
            </label>
            <Input
              {...register("subject", { required: "Subject is required" })}
              placeholder="Brief title of your issue"
              className={`bg-background ${
                errors.subject ? "border-destructive" : ""
              }`}
            />
            {errors.subject && (
              <span className="text-xs text-destructive">
                {errors.subject.message}
              </span>
            )}
          </div>

      
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Message
            </label>
            <Textarea
              {...register("message", {
                required: "Please describe your issue",
              })}
              placeholder="Explain your problem in detail..."
              className={`min-h-30 bg-background resize-none ${
                errors.message ? "border-destructive" : ""
              }`}
            />
            {errors.message && (
              <span className="text-xs text-destructive">
                {errors.message.message}
              </span>
            )}
          </div>

         
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Priority
            </label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General Inquiry</SelectItem>
                    <SelectItem value="medium">Medium - Need Help</SelectItem>
                    <SelectItem value="high">High - As soon as Possible</SelectItem>
                    <SelectItem value="urgent">Urgent - Urgent Issue</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg shadow-lg"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Submit Ticket"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateQuerySheet;
