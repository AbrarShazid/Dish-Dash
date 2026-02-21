"use server";

import { userService } from "@/services/user.service";

interface UpdateProfilePayload {
  name: string;
  image?: string;
}

export const updateProfile = async (payload: UpdateProfilePayload) => {
  try {
    const { error } = await userService.updateProfile(payload);
    if (error) return { error };
    return { success: true };
  } catch (err: any) {
    return { error: { message: err.message || "Something went wrong!" } };
  }
};