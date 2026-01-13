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
import { Label } from "@/components/ui/label";
import { DatePicker } from "./PreHarvestedForm";

const UpdateHarvestDate = ({ currentDate, productId, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      expectedHarvest: currentDate ? new Date(currentDate) : null,
    },
  });

  const onSubmit = async (data) => {
    if (!data.expectedHarvest) return;

    const payload = {
      expectedHarvest: data.expectedHarvest.toISOString(),
    };

    await onUpdate(productId, payload);

    setOpen(false);
    reset({ expectedHarvest: data.expectedHarvest });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
        variant="secondary"
          className="w-full text-sm md:text-base h-11 border border-primary text-primary"
        >
          Update Harvest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 bg-card border-border text-foreground overflow-visible">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Package className="h-5 w-5" />
            Update Price according to stock
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the new Price according to your stock available. Unit:{" "}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="space-y-3">
            <Label>
              Expect Harvest Date <span className="text-destructive">*</span>
            </Label>
            <div className="w-full">
              <DatePicker
                name="expectedHarvest"
                className="w-full"
                control={control}
                placeholder="When did you sow?"
                required={true}
              />
            </div>

            {errors.expectedHarvest && (
              <span className="text-xs text-destructive">
                Sowing date is required
              </span>
            )}
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

export default UpdateHarvestDate;
