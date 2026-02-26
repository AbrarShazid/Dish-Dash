"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { updateProfile } from "@/actions/user.action";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.instanceof(File).nullable(),
});

type UpdateProfileFormProps = {
  defaultName: string;
  defaultImage: string | null;
};

export default function UpdateProfileForm({
  defaultName,
  defaultImage,
}: UpdateProfileFormProps) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(defaultImage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview && preview !== defaultImage) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, defaultImage]);

  const form = useForm({
    defaultValues: { name: defaultName ?? "", image: null as File | null },
    validators: { onSubmit: updateProfileSchema },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const toastId = toast.loading("Updating profile...");

      try {
        let imageUrl: string | undefined;

        if (value.image instanceof File) {
          if (value.image.size > 5 * 1024 * 1024) {
            throw new Error("Image size must be less than 5MB");
          }

          const data = new FormData();
          data.append("image", value.image);

          const res = await fetch(
            "https://api.imgbb.com/1/upload?key=27aac98f57c76c0d2ed161e4f0ccff7b",
            { method: "POST", body: data },
          );

          const result = await res.json();
          if (!result.success) {
            throw new Error(result.error?.message || "ImgBB upload failed");
          }

          imageUrl = result.data.url;
        }

        const payload = { name: value.name, image: imageUrl };
        const { error } = await updateProfile(payload);

        if (error) throw new Error(error.message);

        toast.success("Profile updated successfully", { id: toastId });
        router.refresh();
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6 max-w-md mx-auto p-6 border rounded-lg flex flex-col"
    >
      <form.Field
        name="name"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <input
                required
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Your Name"
                className={`border p-2 rounded w-full ${
                  isInvalid ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
                aria-invalid={isInvalid}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <form.Field
        name="image"
        children={(field) => {
          return (
            <Field>
              <FieldLabel htmlFor={field.name}>Image</FieldLabel>
              <input
                id={field.name}
                name={field.name}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.handleChange(file);

                    // Clean up old preview URL if it exists and isn't the default
                    if (preview && preview !== defaultImage) {
                      URL.revokeObjectURL(preview);
                    }

                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="border p-2 rounded w-full"
                disabled={isSubmitting}
              />
              {preview && (
                <div className="mt-3 flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border"
                  />
                </div>
              )}
            </Field>
          );
        }}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
