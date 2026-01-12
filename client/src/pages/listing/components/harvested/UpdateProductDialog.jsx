import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  BookOpen,
  Edit,
  Loader2,
  Package,
  Pencil,
  Power,
  TextCursor,
} from "lucide-react";
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
import { Switch } from "@/components/ui/switch";

// Added currentUnit prop
const UpdateProductDialog = ({
  title,
  description,
  isActive,
  productId,
  onUpdate,
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
      isActive: Boolean(isActive),
    },
  });

  const onSubmit = async (data) => {
    const payload = data;

    await onUpdate(productId, payload);

    setOpen(false);
    reset({
      title: data.title,
      description: data.description,
      isActive: data.isActive,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {}}
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Product
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Package className="h-5 w-5" />
            Update Title and Description
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the new title and description
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-foreground">
              Product Status
            </Label>
            <p className="text-xs text-muted-foreground">
              {isActive ? "Active & Visible" : "Inactive (Hidden)"}
            </p>

            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
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

export default UpdateProductDialog;
