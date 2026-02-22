import { env } from "@/env";
import { cookies } from "next/headers";

const backendUrl = env.BACKEND_URL;

export const providerService = {
  getAllProvider: async function () {
    try {
      const res = await fetch(`${backendUrl}/provider`, {
        // cache: "no-store",

        next: { revalidate: 60 },
      });

      const allProvider = await res.json();

      if (allProvider.success === true) {
        return { data: allProvider.data, error: null };
      }
      return {
        data: null,
        error: {
          message: allProvider.message || "Failed to fetch provider  list!",
        },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getProviderWithMenu: async function (providerId: string) {
    try {
      const res = await fetch(`${backendUrl}/provider/${providerId}`, {
        // cache: "no-store",

        next: { revalidate: 30 },
      });

      const providerMenu = await res.json();
      if (providerMenu.success === true) {
        return { data: providerMenu.data, error: null };
      }
      return {
        data: null,
        error: {
          message: providerMenu.message || "Failed to fetch provider  list!",
        },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getProviderOrder: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${backendUrl}/order/provider-orders`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const orderData = await res.json();

      if (orderData.success === true) {
        return { data: orderData.data, error: null };
      }

      return {
        data: null,
        error: {
          message: orderData.message || "Failed to fetch order  list!",
        },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
