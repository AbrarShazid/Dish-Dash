import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const BACKEND_URL = env.BACKEND_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session not available!" } };
      }

      return { data: session, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getUserProfile: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/user/get-user-profile`, {
        headers: {
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });

      const userData = await res.json();

      if (userData.success === true) {
        return { data: userData.data, error: null };
      }

      return { data: null, error: { message: "User not available!" } };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  updateProfile: async function (payload: { name: string; image?: string }) {
    try {
      const cookieStore = await cookies(); // forward cookies if needed

      const res = await fetch(
        `${process.env.BACKEND_URL}/user/update-profile`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            cookie: cookieStore.toString(),
          },
        },
      );

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

  getAlluser: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/user`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const allUser = await res.json();

      if (allUser.success === true) {
        return { data: allUser.data, error: null };
      }
      return {
        data: null,
        error: { message: allUser.message || "User not available!" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  updateUserStatus: async function (userId: string, status: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/user/${userId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const statusUpdate = await res.json();

      if (statusUpdate.success === true) {
        return { data: statusUpdate.data, error: null };
      }
      return {
        data: null,
        error: { message: statusUpdate.message || "Status not changed!" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
