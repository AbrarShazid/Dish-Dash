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

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { uploadImageCloudinary } from "@/lib/uploadCloudinary";

const menuItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string(),
  price: z.number().min(0.01, "Price must be greater than 0"),
  categoryId: z.string().min(1, "Please select a category"),
  imageUrl: z.string(),
});

interface AddEditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: any, toastId?: string | number) => void;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      imageUrl: "",
    },
    validators: {
      onSubmit: menuItemSchema,
    },
    onSubmit: async ({ value }) => {
      setIsUploading(true);
      const toastId = toast.loading("Saving...");
      try {
        if (selectedFile) {
          value.imageUrl = await uploadImageCloudinary(selectedFile);
        }
        onSave(value, toastId);
        setSelectedFile(null);
        form.reset();
      } catch (err: any) {
        toast.error(err.message || "Failed to save item", { id: toastId });
      } finally {
        setIsUploading(false);
      }
    },
  });

  useEffect(() => {
    setSelectedFile(null);
    if (isOpen) {
      if (editingItem) {
        form.reset({
          name: editingItem.name || "",
          description: editingItem.description || "",
          price: editingItem.price || 0,
          categoryId: editingItem.categoryId || "",
          imageUrl: editingItem.imageUrl || "",
        });
      } else {
        form.reset({
          name: "",
          description: "",
          price: 0,
          categoryId: "",
          imageUrl: "",
        });
      }
    }
  }, [isOpen]);

  // Separate useEffect for editingItem changes
  useEffect(() => {
    if (isOpen && editingItem) {
      form.setFieldValue("imageUrl", editingItem.imageUrl || "");
    }
  }, [editingItem?.id]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125 max-h-[90vh] flex flex-col p-0 bg-white dark:bg-gray-900">
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
                          step="0.01"
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
                          <SelectContent className="bg-gray-50 dark:bg-gray-800 ">
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

              {/* Image Upload */}
              <Field>
                <FieldLabel>Item Image</FieldLabel>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Max file size: 5MB. Supported formats: JPG, PNG, GIF etc
                </p>
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              Save Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
