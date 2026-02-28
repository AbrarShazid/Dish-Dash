"use server";

import { categoryService } from "@/services/category.service";

export async function createCategory({ name }: { name: string }) {
  try {
    const { data, error } = await categoryService.createCategory(name);

    if (error) {
      return { error };
    }

    return { data };
  } catch (err: any) {
    return { error: { message: "Failed to create category" } };
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const { data, error } = await categoryService.deleteCategory(categoryId);

    if (error) {
      return { error };
    }

    return { data };
  } catch (err: any) {
    return { error: { message: "Failed to delete category" } };
  }
}
