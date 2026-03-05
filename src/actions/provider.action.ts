"use server";

import { providerService } from "@/services/provider.service";
import { BecomeProviderPayload, UpdateProviderProfileData } from "@/types";

export const becomeProvider = async (payload: BecomeProviderPayload) => {
  try {
    const { error } = await providerService.becomeProvider(payload);
    if (error) return { error };
    return { success: true };
  } catch (err: any) {
    return { error: { message: err.message || "Something went wrong!" } };
  }
};

export async function updateProviderProfile(data: UpdateProviderProfileData) {
  try {
    const { data: result, error } = await providerService.updateProfile(data);

    if (error) {
      return { error };
    }

    return { success: true, data: result };
  } catch (error: any) {
    return {
      error: { message: error.message || "Failed to update provider profile" },
    };
  }
}
