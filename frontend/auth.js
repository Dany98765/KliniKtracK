import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import User from "./db/user.model"
// import bcrypt from "bcrypt"
// import dbConnect from "./utils/mongoose"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60
  },
  jwt: {
    maxAge: 60 * 60
  },
  providers: [
    Credentials({
      credentials: {
        name: {
          type: "text",
          label: "nameField",
          placeholder: "Enter your full name..."
        },
        email: {
          type: "email",
          label: "emailField",
          placeholder: "Enter your email address...",
        },
        password: {
          type: "password",
          label: "passwordField",
          placeholder: "Create a strong password...",
        },
      },
      authorize: async (credentials) => {
        // await dbConnect()
        // let user = null
        // user = await User.findOne({ email: credentials.email })
        // if (!user) return null
        // const matchingPasswords = await bcrypt.compare(credentials.password, user.password)
        // if (!matchingPasswords) return null;
        return {
          id: 384879289498093895897937n,
          email: credentials.email,
          name: credentials.name
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
        };
      }
      return session;
    },
  },
})