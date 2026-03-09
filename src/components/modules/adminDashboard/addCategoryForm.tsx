"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/category.action";
import { useState } from "react";

// Validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s-&]+$/,
      "Category name can only contain letters, spaces, hyphens, and &",
    ),
});

export function AddCategoryForm() {
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmiting(true);
      try {
        const { error } = await createCategory({ name: value.name.trim() });

        if (error) {
          toast.error(error.message || "Failed to create category");
        } else {
          toast.success("Category created successfully");
          form.reset();
          router.refresh();
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
      setIsSubmiting(false);
    },
  });

  return (
    <Card className="border shadow-sm bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Add New Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="e.g., Italian, Burgers, Desserts"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={isSubmiting}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <Field>
              <Button
                type="submit"
                disabled={isSubmiting}
                className="w-full sm:w-auto"
              >
                {isSubmiting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </>
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
