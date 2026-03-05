import { env } from "@/env";
import { BecomeProviderPayload, UpdateProviderProfileData } from "@/types";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const providerService = {
  getAllProvider: async function () {
    try {
      const res = await fetch(`${BACKEND_URL}/provider`, {
        cache: "no-store",
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
      const res = await fetch(`${BACKEND_URL}/provider/${providerId}`, {
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
      const res = await fetch(`${BACKEND_URL}/order/provider-orders`, {
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

  becomeProvider: async function (payload: BecomeProviderPayload) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/provider/become-provider`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
      });

      const result = await res.json();
      if (result.success) return { data: result.data, error: null };
      return { data: null, error: { message: result.message } };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong!" },
      };
    }
  },

  //update restaurant
  updateProfile: async (data: UpdateProviderProfileData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/provider/provider-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const result = await res.json();

      if (result.success) {
        return { data: result.data, error: null };
      }

      return {
        data: null,
        error: { message: result.message || "Failed to update profile" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getProviderProfile: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/provider/my-profile`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await res.json();

      if (result.success) {
        return { data: result.data, error: null };
      }

      return {
        data: null,
        error: { message: result.message || "Failed to get profile" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
