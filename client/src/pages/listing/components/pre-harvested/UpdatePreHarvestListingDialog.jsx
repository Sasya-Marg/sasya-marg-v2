import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Edit, Loader2, Package } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

// Added currentUnit prop
const UpdatePreHarvestProductDialog = ({
  title,
  description,
  productId,
  onUpdate,
  minimumOrderQuantity,
  minimumOrderQuantityUnit,
  qualityGrade,
  status,
}) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: title || "",
      description: description || "",
      minimumOrderQuantity: minimumOrderQuantity,
      qualityGrade: qualityGrade,
      status: status,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      description: data.description,
      minimumOrderQuantity: {
        value: data.minimumOrderQuantity,
        unit: minimumOrderQuantityUnit,
      },
      qualityGrade: data.qualityGrade,
      status: data.status,
    };

    await onUpdate(productId, payload);

    setOpen(false);
    reset({
      title: data.title,
      description: data.description,
      minimumOrderQuantity: data.minimumOrderQuantity,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="border-primary/20 border text-primary cursor-pointer"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-120 bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Package className="h-5 w-5" />
            Update Product according to need
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the new Product details according to your
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="title" className="text-right text-foreground">
              Title
            </Label>
            <div className="col-span-3">
              <Input
                id="title"
                type="text"
                className="border-input bg-background focus-visible:ring-primary"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              {errors.title && (
                <span className="text-destructive text-xs mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="description" className="text-right text-foreground">
              Description
            </Label>
            <div className="col-span-3">
              <Textarea
                id="description"
                className="border-input bg-background focus-visible:ring-primary"
                {...register("description", {
                  required: "description is required",
                })}
              />
              {errors.description && (
                <span className="text-destructive text-xs mt-1 block">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <Label htmlFor="title" className="text-right text-foreground">
              Min. Order <span>Unit : {minimumOrderQuantityUnit}</span>
            </Label>
            <div className="col-span-3">
              <Input
                id="minimumOrderQuantity"
                type="number"
                className="border-input bg-background focus-visible:ring-primary"
                {...register("minimumOrderQuantity", {
                  required: "Title is required",
                  valueAsNumber: true,
                })}
              />
              {errors.minimumOrderQuantity && (
                <span className="text-destructive text-xs mt-1 block">
                  {errors.minimumOrderQuantity.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
            <Label className="text-left md:text-left text-foreground">
              Quality Grade
            </Label>

            <div className="col-span-1 md:col-span-3">
              <Controller
                name="qualityGrade"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {["A", "B", "C", "organic"].map((grade) => (
                      <label
                        key={grade}
                        className={`cursor-pointer px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                          field.value === grade
                            ? "bg-primary/10 border-border text-primary"
                            : "bg-background hover:bg-muted"
                        }`}
                      >
                        <input
                          type="radio"
                          {...field}
                          value={grade}
                          className="hidden"
                          checked={field.value === grade}
                        />
                        {grade.toUpperCase()}
                      </label>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
            <Label className="text-left md:text-right text-foreground">
              Status
            </Label>

            <div className="col-span-1 md:col-span-3">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {["open", "booked", "harvested", "cancelled"].map(
                      (grade) => (
                        <label
                          key={grade}
                          className={`cursor-pointer px-3 py-2 rounded-md border text-xs font-medium transition-colors ${
                            field.value === grade
                              ? "bg-primary/10 border-border text-primary"
                              : "bg-background hover:bg-muted"
                          }`}
                        >
                          <input
                            type="radio"
                            {...field}
                            value={grade}
                            className="hidden"
                            checked={field.value === grade}
                          />
                          {grade.toUpperCase()}
                        </label>
                      ),
                    )}
                  </div>
                )}
              />
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

export default UpdatePreHarvestProductDialog;
