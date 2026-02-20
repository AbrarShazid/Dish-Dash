import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      // getting the cookies from browser as it is a server side Component
      const cookieStore = await cookies();

      // fetch the session and give the cookies with header
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },

        cache: "no-store", // Disable caching to always fetch fresh user data
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
};
