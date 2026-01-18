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
const UpdateStockDialog = ({
  currentStock,
  currentUnit,
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
      stockValue: currentStock || 0,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      stock: {
        value: Number(data.stockValue),
        unit: currentUnit,
      },
    };

    await onUpdate(productId, payload);

    setOpen(false);
    reset({ stockValue: data.stockValue });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-full border-primary/50 cursor-pointer text-primary border h-11 text-sm"
        >
          Update Stock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Package className="h-5 w-5" />
            Update Stock Level
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the new total quantity available. Unit:{" "}
            <strong>{currentUnit}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right text-foreground">
              Quantity
            </Label>
            <div className="col-span-3">
              <Input
                id="stock"
                type="number"
                step="0.01"
                className="border-input bg-background focus-visible:ring-primary"
                {...register("stockValue", {
                  required: "Value is required",
                  min: { value: 0, message: "Stock cannot be negative" },
                  valueAsNumber: true,
                })}
              />
              {errors.stockValue && (
                <span className="text-destructive text-xs mt-1 block">
                  {errors.stockValue.message}
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

export default UpdateStockDialog;
