import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Added currentUnit prop
const UpdateExpectedPriceDialog = ({
  currentExpectedPrice,
  currentExpectedPriceUnit,
  productId,
  onUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      expectedPrice: currentExpectedPrice || 0,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      expectedPrice: {
        value: Number(data.expectedPrice),
        unit: currentExpectedPriceUnit,
      },
    };

    await onUpdate(productId, payload);

    setOpen(false);
    reset({ expectedPrice: data.expectedPrice });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full border border-primary text-primary-foreground hover:bg-secondary hover:text-primary h-11 text-sm cursor-pointer">
          Update Price
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Package className="h-5 w-5" />
            Update Price according to stock
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the new Price according to your stock available. Unit:{" "}
            <strong>{currentExpectedPriceUnit}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right text-foreground">
              Expected Price
            </Label>
            <div className="col-span-3">
              <Input
                id="price"
                type="number"
                step="0.01"
                className="border-input bg-background focus-visible:ring-primary"
                {...register("expectedPrice", {
                  required: "Value is required",
                  min: { value: 0, message: "Price cannot be negative" },
                  valueAsNumber: true,
                })}
              />
              {errors.expectedPrice && (
                <span className="text-destructive text-xs mt-1 block">
                  {errors.expectedPrice.message}
                </span>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-border text-muted-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExpectedPriceDialog;
