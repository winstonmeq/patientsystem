import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mongodb'
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  // config: {
  //   // ... other configurations
  //   origins: [
  //     'http://localhost:3000',
  //     'http://192.168.1.9:3000' // Replace with your IP
  //   ],
  // },
 
})