import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,

  //baseURL: "https://patientsystem.vercel.app/api/auth"
  
  // the base url of your auth server
})