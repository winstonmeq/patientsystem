import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

// Create the handler using better-auth
const betterAuthHandlers = toNextJsHandler(auth.handler);

const ajProtectedPOST = async (req: NextRequest) => {
  
  const { email } = await req.clone().json();

  // Since `arcjet` is removed, we will directly call the auth handler.
  // Perform email validation if needed, or handle it within the `auth` logic
  return betterAuthHandlers.POST(req);
}

export { ajProtectedPOST as POST };

export const { GET } = betterAuthHandlers;
