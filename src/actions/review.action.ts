"use server";

import { reviewService } from "@/services/review.service";

export async function createReview({
  mealId,
  rating,
  comment,
}: {
  mealId: string;
  rating: number;
  comment?: string;
}) {
  try {
    const result = await reviewService.createReview(mealId, rating, comment);

    
    if (result.error) {
      return { error: { message: result.error.message } };
    }

    // Success case
    return { data: result.data, error: null };
  } catch (error: any) {
  
    return { error: { message: error.message || "Failed to create review" } };
  }
}
