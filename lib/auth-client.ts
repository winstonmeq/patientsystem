import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/auth" 

  //baseURL: "https://patientsystem.vercel.app/api/auth"
  
  // the base url of your auth server
})