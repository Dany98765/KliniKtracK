import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

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
        role: {
          type: "text",
          label: "roleField",
          placeholder: "Select Role",
        },
      },
      authorize: async (credentials) => {
        console.log("CREDENTIALS: " + credentials)
        return {
          id: credentials.userId,
          email: credentials.email,
          name: credentials.name,
          role: credentials.role
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
        token.role = user.role
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: Number(token.id),
          email: token.email,
          name: token.name,
          role: token.role
        };
      }
      return session;
    },
  },
})