import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const categoryService = {
  createCategory: async function (name: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/category/add-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (data.success === true) {
        return { data: data.data, error: null };
      }

      return {
        data: null,
        error: { message: data.message || "Failed to create category" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getAllCategory: async function () {
    try {
      const res = await fetch(`${BACKEND_URL}/category/get-all-category`, {
        cache:"no-store",
      });
      const categoryData = await res.json();

      if (categoryData.success === true) {
        return { data: categoryData.data, error: null };
      }
      return {
        data: null,
        error: { message: categoryData.message || "Something went wrong" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  deleteCategory: async function (categoryId: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/category/${categoryId}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();

      if (data.success === true) {
        return { data: data.data, error: null };
      }

      return {
        data: null,
        error: { message: data.message || "Failed to delete category" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
