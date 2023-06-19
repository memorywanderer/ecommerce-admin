import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "email", placeholder: "example@email.com" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const response = await axios.post("https://ecommerce-admin-silk.vercel.app/api/signin", credentials, {
          headers: {
            Cookie: req.headers.cookie
          }
        })

        const user = response.data

        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...user, ...token };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  }
})
