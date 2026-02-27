"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Store, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { becomeProvider } from "@/actions/provider.action";

const becomeProviderSchema = z.object({
  restaurantName: z
    .string()
    .min(2, "Restaurant name must be at least 2 characters"),
  description: z.string().nullable(),
  image: z.instanceof(File).nullable(),
});

type BecomeProviderProps = {
  defaultRestaurantName: string;
  defaultDescription: string | null;
  defaultImage: File | null;
};

export default function BecomeProvider({
  defaultRestaurantName,
  defaultDescription,
  defaultImage,
}: BecomeProviderProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      restaurantName: defaultRestaurantName ?? "",
      description: defaultDescription ?? null,
      image: null as File | null,
    },
    validators: { onSubmit: becomeProviderSchema },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const toastId = toast.loading("Submitting your application...");

      try {
        // Handle image upload if present
        let imageUrl: string | undefined;

        if (value.image instanceof File) {
          if (value.image.size > 5 * 1024 * 1024) {
            throw new Error("Image size must be less than 5MB");
          }

          const formData = new FormData();
          formData.append("image", value.image);

          const res = await fetch(
            "https://api.imgbb.com/1/upload?key=27aac98f57c76c0d2ed161e4f0ccff7b",
            { method: "POST", body: formData },
          );

          const result = await res.json();
          if (!result.success) {
            toast.error(result.error?.message || "Image upload failed", {
              id: toastId,
            });
            return;
          }

          imageUrl = result.data.url;
        }

        // Prepare payload for your server action
        const payload = {
          restaurantName: value.restaurantName,
          description: value.description ?? undefined,
          image: imageUrl ?? undefined,
        };

        // Call your server action here
        const res = await becomeProvider(payload);

        if (res.error) {
          toast.error(res.error?.message || "Something went wrong!", {
            id: toastId,
          });
          return;
        }

        toast.success("You are now a provider! Welcome to DishDash.", {
          id: toastId,
        });
        router.refresh();
        router.push("/");

        form.reset();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong";
        toast.error(errorMessage, { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen rounded-xl bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className=" shadow-lg      bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
              <Store className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              Become a Provider
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Start your journey with DishDash. Fill out the form below to get
              started.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              {/* Restaurant Name (Required) */}
              <form.Field
                name="restaurantName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Restaurant Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="e.g., Your Restaurant Name"
                        className={isInvalid ? "border-red-500" : ""}
                        disabled={isSubmitting}
                      />
                      {isInvalid && (
                        <p className="text-sm text-red-500">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      )}
                    </div>
                  );
                }}
              />

              {/* Description (Optional) */}
              <form.Field
                name="description"
                children={(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor={field.name}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Description{" "}
                      <span className="text-gray-400 text-sm">(optional)</span>
                    </Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ""}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value === "" ? null : e.target.value,
                        )
                      }
                      onBlur={field.handleBlur}
                      placeholder="Tell us about your restaurant and cuisine..."
                      className="min-h-25"
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              />

              {/* Image Upload (Optional) */}
              <form.Field
                name="image"
                children={(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor={field.name}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Restaurant Image{" "}
                      <span className="text-gray-400 text-sm">(optional)</span>
                    </Label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                      <input
                        id={field.name}
                        name={field.name}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.handleChange(file);
                            setPreview(URL.createObjectURL(file));
                          }
                        }}
                        className="hidden"
                        disabled={isSubmitting}
                      />
                      <Label
                        htmlFor={field.name}
                        className="cursor-pointer inline-flex flex-col items-center gap-2"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Click to upload restaurant image
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          PNG, JPG up to 5MB
                        </span>
                      </Label>
                    </div>

                    {preview && (
                      <div className="mt-3 flex justify-center">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-32 h-32 md:w-80 md:h-80 rounded-lg object-cover border"
                        />
                      </div>
                    )}
                  </div>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-black text-white py-6 text-lg"
              >
                {isSubmitting ? "Processing..." : "Become a Provider"}
              </Button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By becoming a provider, your account role will be updated to
                PROVIDER.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
