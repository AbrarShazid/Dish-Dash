// import { env } from "@/env"
// import { createAuthClient } from "better-auth/react"
// const BACKEND_URL=env.NEXT_PUBLIC_BACKEND_URL

// export const authClient = createAuthClient({
//     /** The base URL of the server (optional if you're using the same domain) */
//     //  baseURL: "http://localhost:5000",
//      baseURL: `${BACKEND_URL}`,
// })

import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});