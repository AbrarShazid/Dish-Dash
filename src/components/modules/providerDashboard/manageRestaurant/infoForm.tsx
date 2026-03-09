"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Upload, X } from "lucide-react";
import { updateProviderProfile } from "@/actions/provider.action";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { uploadImageCloudinary } from "@/lib/uploadCloudinary";
import Image from "next/image";
import { getCloudinaryImage } from "@/lib/getCloudinaryImage";

const infoFormSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
});

interface RestaurantInfoFormProps {
  profile: {
    restaurantName: string;
    description?: string | null;
    imageUrl?: string | null;
  };
  onUpdate: (data: {
    restaurantName: string;
    description?: string | null;
    imageUrl?: string | null;
  }) => void;
}

export function RestaurantInfoForm({
  profile,
  onUpdate,
}: RestaurantInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    profile.imageUrl || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm({
    defaultValues: {
      restaurantName: profile.restaurantName || "",
      description: profile.description ?? null,
      imageUrl: profile.imageUrl ?? null,
    },
    validators: {
      onChange: infoFormSchema,
      onSubmit: infoFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const toastId = toast.loading("Updating your data...");

      try {
        const imageUrl = selectedFile
          ? await uploadImageCloudinary(selectedFile)
          : value.imageUrl;

        const { error } = await updateProviderProfile({ ...value, imageUrl });

        if (error) {
          return toast.error(error.message, { id: toastId });
        }

        onUpdate({
          restaurantName: value.restaurantName,
          description: value.description || null,
          imageUrl: imageUrl || null,
        });

        setSelectedFile(null);
        toast.success("Restaurant information updated successfully", {
          id: toastId,
        });
      } catch (error) {
        toast.error("Failed to update restaurant information", { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    form.setFieldValue("imageUrl", null);
  };

  const currentImage = preview || form.state.values.imageUrl;
  return (
    <Card className="p-6 bg-gray-50 dark:bg-gray-800 mb-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Update your restaurant's name, description, and image
          </p>
        </div>

        <div className="space-y-6">
          {/* Restaurant Name Field */}
          <form.Field
            name="restaurantName"
            children={(field) => {
              const isInvalid = !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>
                    Restaurant Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={isSubmitting}
                    placeholder="Enter restaurant name"
                    className={isInvalid ? "border-red-500" : ""}
                    required
                  />
                  {isInvalid && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          {/* Description Field */}
          <form.Field
            name="description"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  Description{" "}
                  <span className="text-gray-400 text-sm">(optional)</span>
                </Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value || ""}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value === "" ? null : e.target.value,
                    )
                  }
                  onBlur={field.handleBlur}
                  disabled={isSubmitting}
                  placeholder="Describe your restaurant and cuisine..."
                  rows={4}
                />
                <p className="text-xs text-gray-500">
                  This will be shown to customers.
                </p>
              </div>
            )}
          />

          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label>
              Restaurant Image{" "}
              <span className="text-gray-400 text-sm">(optional)</span>
            </Label>

            {/* Image Preview */}
            {currentImage && (
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                  <Image
                    src={
                      preview
                        ? preview
                        : form.state.values.imageUrl
                          ? getCloudinaryImage(form.state.values.imageUrl, 800)
                          : ""
                    }
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Restaurant preview"
                    fill
                    className="object-cover"
                  />
                  {selectedFile && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                        New
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                  onClick={handleRemoveImage}
                  disabled={isSubmitting}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Upload Area */}
            {!preview && !form.state.values.imageUrl && (
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-300 dark:hover:border-gray-400 transition-colors">
                <input
                  id="restaurant-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <Label
                  htmlFor="restaurant-image"
                  className="cursor-pointer inline-flex flex-col items-center gap-3"
                >
                  <Upload className="w-10 h-10 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Click to upload restaurant image
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </Label>
              </div>
            )}

            {/* Change Image Button (when image exists) */}
            {currentImage && (
              <div className="flex justify-center">
                <div className="relative">
                  <input
                    id="change-restaurant-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
          <form.Subscribe
            selector={(state) => [state.isSubmitting]}
            children={([isSubmitting]) => (
              <Button type="submit" disabled={isSubmitting} size="lg">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            )}
          />
        </div>
      </form>
    </Card>
  );
}
