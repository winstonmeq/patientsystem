import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  //baseURL: "http://localhost:3000" 
  baseURL: "https://patientsystem.vercel.app"
  // the base url of your auth server
})