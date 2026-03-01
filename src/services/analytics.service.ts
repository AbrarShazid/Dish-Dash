import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const analyticsService = {
  getAdminAnalytics: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/analytics/admin`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const analyticsData = await res.json();

      if (analyticsData.success === true) {
        return { data: analyticsData.data, error: null };
      }
      return {
        data: null,
        error: { message: analyticsData.message || "Something went wrong!" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getProviderAnalytics: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/analytics/provider`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const analyticsData = await res.json();

      if (analyticsData.success === true) {
        return { data: analyticsData.data, error: null };
      }
      return {
        data: null,
        error: { message: analyticsData.message || "Something went wrong!" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
