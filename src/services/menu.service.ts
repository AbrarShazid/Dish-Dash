import { env } from "@/env";
import { cookies } from "next/headers";

interface GetAllMenuItemParams {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface FetchOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const BACKEND_URL = env.BACKEND_URL;
export const menuService = {
  getAllMenuItem: async function (
    params?: GetAllMenuItemParams,
    options?: FetchOptions,
  ) {
    try {
      const url = new URL(`${BACKEND_URL}/menu`);

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
      const res = await fetch(`${BACKEND_URL}/menu/${id}`, {
        cache: "no-store",
      });
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
  //provider menu by his id
  getRestaurantMenu: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/menu/provider`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const menuItems = await res.json();

      if (menuItems.success === true) {
        return { data: menuItems.data, error: null };
      }

      return {
        data: null,
        error: { message: menuItems.message || "Failed to fetch menu items!" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  createMenuItem: async function (data: {
    name: string;
    description?: string;
    price: number;
    categoryId: string;
    imageUrl?: string | null;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/menu/add-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const result = await res.json();

      if (result.success === true) {
        return { data: result.data, error: null };
      }

      return {
        data: null,
        error: { message: result.message || "Failed to create menu item" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  updateMenuItem: async function (
    itemId: string,
    data: {
      name?: string;
      description?: string | null;
      price?: number;
      categoryId?: string;
      imageUrl?: string | null;
      isAvailable?: boolean;
    },
  ) {
    try {
      const cookieStore = await cookies();
      console.log("Sending to backend:", data);

      const res = await fetch(`${BACKEND_URL}/menu/update/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const result = await res.json();

      if (result.success === true) {
        return { data: result.data, error: null };
      }

      return {
        data: null,
        error: { message: result.message || "Failed to update menu item" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  deleteMenuItem: async function (itemId: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/menu/delete/${itemId}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await res.json();

      if (result.success === true) {
        return { data: result.data, error: null };
      }

      return {
        data: null,
        error: { message: result.message || "Failed to delete menu item" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
