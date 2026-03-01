
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

import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Loader2 } from "lucide-react";

const menuItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.number().min(0.01, "Price must be greater than 0"),
  categoryId: z.string().min(1, "Please select a category"),
  imageUrl: z.string().url("Invalid URL").optional().nullable(),
  isAvailable: z.boolean().default(true),
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
  const form = useForm({
    defaultValues: {
      name: editingItem?.name || "",
      description: editingItem?.description || "",
      price: editingItem?.price || 0,
      categoryId: editingItem?.categoryId || "",
      imageUrl: editingItem?.imageUrl || null,
      isAvailable: editingItem?.isAvailable ?? true,
    },
    validators: {
      onSubmit: menuItemSchema,
    },
    onSubmit: async ({ value }) => {
      onSave(value);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
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
        >
          <FieldGroup className="space-y-4 py-4">
            {/* Name */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Item Name *</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g., Classic Burger"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Price *</FieldLabel>
                      <Input
                        id={field.name}
                        type="number"
                        step="0.01"
                        min="0"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="categoryId"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
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
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            </div>

            {/* Image URL */}
            <form.Field
              name="imageUrl"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                    <Input
                        type="file"
                      id={field.name}
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value || null)}
                      placeholder="https://example.com/image.jpg"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

      
          </FieldGroup>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.state.isSubmitting}>
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