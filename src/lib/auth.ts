import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as argon2 from "argon2";
import db from "./prisma-config"; // Ensure you have this configured correctly
import { z } from "zod";
import { createUserSchema } from "./types/validations";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(db),
    providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      authorize: async (credentials) => {
        try {
          const validatedCredentials = createUserSchema.safeParse(credentials);
        
        if (!validatedCredentials.success) {
          throw new Error("Invalid Credentials.");
        }

        // Verify if the user exists in the database
         const user = await db.user.findUnique({
          where: { email: validatedCredentials.data.email},
        });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await compare( validatedCredentials.data.password,user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials.");
        }
        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      } catch (error) {
        console.error("Authorization error:", error);
        throw new Error("Invalid credentials.");
      }
      },
    }),
  ],
  secret:process.env.AUTH_SECRET,
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
    async session({ session, token }) {
      // Attach user info to the session
      if (token) {
        session.user = {
          id: token.id+'' ,
          email: token.email!,
          name: token.name,
          emailVerified:null
        };
      }
      return session;
    },
  },
});
