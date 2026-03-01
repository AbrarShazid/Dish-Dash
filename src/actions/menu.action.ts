"use server";

import { menuService } from "@/services/menu.service";
import { revalidatePath } from "next/cache";

export async function createMenuItem(data: {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  imageUrl?: string | null;
}) {
  try {
    const { error } = await menuService.createMenuItem(data);

    if (error) {
      return { error };
    }

    revalidatePath("/dashboard-provider/manage-menu");
    return { success: true };
  } catch (error: any) {
    return { error: { message: error.message || "Failed to create menu item" } };
  }
}

export async function updateMenuItem(
  itemId: string, 
  data: {
    name?: string;
    description?: string | null;
    price?: number;
    categoryId?: string;
    imageUrl?: string | null;
    isAvailable?: boolean;
  }
) {
  try {
        console.log("Updating action item with data:", data); 
    const { error } = await menuService.updateMenuItem(itemId, data);

    if (error) {
      return { error };
    }

    revalidatePath("/dashboard-provider/manage-menu");
    return { success: true };
  } catch (error: any) {
    return { error: { message: error.message || "Failed to update menu item" } };
  }
}

export async function deleteMenuItem(itemId: string) {
  try {
    const { error } = await menuService.deleteMenuItem(itemId);

    if (error) {
      return { error };
    }

    revalidatePath("/dashboard-provider/manage-menu");
    return { success: true };
  } catch (error: any) {
    return { error: { message: error.message || "Failed to delete menu item" } };
  }
}