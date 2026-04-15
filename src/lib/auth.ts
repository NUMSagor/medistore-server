import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { sendOtpEmail } from "./email.js"; 

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL: "https://medistore-server.vercel.app/api",
  trustedOrigins: [
    "https://client-medistore.vercel.app",
    "http://localhost:3000",
  ], 


  // Add this block to allow name and role
  user: {
    additionalFields: {
      name: {
        type: "string",
        required: true, 
      },
      role: {
        type: "string",
        defaultValue: "CUSTOMER", // Optional: set a default role
        input: true, // Crucial: allows the client to send this field
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, token }) => {
      // The 'user' object here will now also include 'name' and 'role'
      await sendOtpEmail(user.email, token); 
    },
  },
});

// Important for Client-side type safety
export type Auth = typeof auth;
