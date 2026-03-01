"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const menuItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.number().min(0.01, "Price must be greater than 0"),
  categoryId: z.string().min(1, "Please select a category"),
  imageUrl: z.string().optional().nullable(),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

interface AddEditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  categories: { id: string; name: string }[];
  editingItem?: any | null;
}

export function AddEditItemModal({
  isOpen,
  onClose,
  onSave,
  categories,
  editingItem,
}: AddEditItemModalProps) {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: editingItem?.name || "",
      description: editingItem?.description || "",
      price: editingItem?.price || 0,
      categoryId: editingItem?.categoryId || "",
      imageUrl: editingItem?.imageUrl || null,
    },
    validators: {
      onSubmit: menuItemSchema,
    },
    onSubmit: async ({ value }) => {
      onSave(value);
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        "https://api.imgbb.com/1/upload?key=27aac98f57c76c0d2ed161e4f0ccff7b",
        { method: "POST", body: formData },
      );

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error?.message || "Image upload failed");
      }

      form.setFieldValue("imageUrl", result.data.url);
      toast.success("Image uploaded successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col p-0 bg-white dark:bg-gray-900">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>
            {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
          </DialogTitle>
          <DialogDescription>
            {editingItem
              ? "Update the details of your menu item"
              : "Add a new item to your restaurant menu"}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto px-6">
            <FieldGroup className="space-y-4 py-4">
              {/* Name */}
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Item Name *</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g., Classic Burger"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Description */}
              <form.Field
                name="description"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Describe your item..."
                      rows={3}
                    />
                  </Field>
                )}
              />

              {/* Price and Category */}
              <div className="grid grid-cols-2 gap-4">
                <form.Field
                  name="price"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Price *</FieldLabel>
                        <Input
                          id={field.name}
                          type="number"
                          step="1"
                          min="0"
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(parseFloat(e.target.value) || 0)
                          }
                          placeholder="0.00"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="categoryId"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Category *</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={field.handleChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              {/* Image Upload - Returns URL */}
              <Field>
                <FieldLabel>Item Image</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="cursor-pointer"
                  />
                  {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Max file size: 5MB. Supported formats: JPG, PNG, GIF
                </p>

                {/* Show image URL after upload */}
                <form.Field
                  name="imageUrl"
                  children={(field) => (
                    <>
                      {field.state.value && (
                        <div className="mt-2">
                          <p className="text-xs text-green-600 dark:text-green-400 break-all">
                            ✓ Image uploaded successfully
                        
                          </p>
                        </div>
                      )}
                      {editingItem?.imageUrl && !field.state.value && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Current image will be kept
                        </p>
                      )}
                    </>
                  )}
                />
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.state.isSubmitting || isUploading}
            >
              {form.state.isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Item"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
