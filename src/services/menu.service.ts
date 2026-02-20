import { env } from "@/env";
import { success } from "zod";

interface GetAllMenuItemParams {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface FetchOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const API_URL = env.BACKEND_URL;
export const menuService = {
  getAllMenuItem: async function (
    params?: GetAllMenuItemParams,
    options?: FetchOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/menu`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);
      const menuItems = await res.json();

      if (menuItems.success === true) {
        return { data: menuItems, error: null };
      }

      return {
        data: null,
        error: { message: menuItems.message || "Failed to fetch menu items!" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getMenuById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/menu/${id}`);
      const menuItem = await res.json();

      if (menuItem.success === true) {
        return { data: menuItem, error: null };
      }
      return {
        data: null,
        error: { message: menuItem.message || "Failed to fetch menu item!" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
