import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as argon2 from "argon2";
import db from "./prisma-config"; // Ensure you have this configured correctly
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      // authorize: async (credentials) => {
      //   try {
      //     const validatedCredentials = credentialsSchema.parse(credentials);
        
      //   if (!credentials?.email || !credentials?.password) {
      //     throw new Error("Email and password are required.");
      //   }

      //   // Verify if the user exists in the database
      //    const user = await db.user.findUnique({
      //     where: { email: validatedCredentials.email as string},
      //   });

      //   if (!user) {
      //     throw new Error("No user found with this email.");
      //   }

      //   // Compare the provided password with the hashed password stored in the database
      //   const isPasswordValid = await argon2.verify(user.password, validatedCredentials.password as string);
      //   if (!isPasswordValid) {
      //     throw new Error("Invalid credentials.");
      //   }

      //   // Return the user object without sensitive information like the hashed password
      //   return {
      //     id: user.id,
      //     username: user.username,
      //     email: user.email,
      //   };
      // } catch (error) {
      //   console.error("Authorization error:", error);
      //   throw new Error("Invalid credentials.");
      // }
      // },
    }),
  ],
  pages: {
    signIn: "/login", // Customize your sign-in page
  },
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      // Include user information in the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    // async session({ session, token }) {
      // Attach user info to the session
      // if (token) {
      //   session.user = {
      //     id: token.id,
      //     email: token.email,
      //     name: token.name,
      //   };
      // }
      // return session;
    // },
  },
});
