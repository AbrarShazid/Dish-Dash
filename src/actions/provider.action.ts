"use server"

import { providerService } from "@/services/provider.service";
import { BecomeProviderPayload } from "@/types";



export const becomeProvider=async(payload:BecomeProviderPayload)=>{
 try {
    const { error } = await providerService.becomeProvider(payload);
    if (error) return { error };
    return { success: true };
  } catch (err: any) {
    return { error: { message: err.message || "Something went wrong!" } };
  }


}