import { env } from "@/env";
import { cookies } from "next/headers";
const BACKEND_URL = env.BACKEND_URL;

export const reviewService = {
  createReview: async function (
    mealId: string,
    rating: number,
    comment?: string,
  ) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/review/${mealId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ rating, comment }),
        cache: "no-store",
      });

      const reviewData = await res.json();


      if (reviewData.success === true) {
        return { data: reviewData.data, error: null };
      }

      return {
        data: null,
        error: { message: reviewData.message || "Something went wrong!" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
