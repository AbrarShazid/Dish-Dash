import { env } from "@/env";

const BACKEND_URL = env.BACKEND_URL;

export const categoryService = {
  getAllCategory: async function () {
    try {
      const res = await fetch(`${BACKEND_URL}/category/get-all-category`, {
        next: { revalidate: 120 },
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
};
