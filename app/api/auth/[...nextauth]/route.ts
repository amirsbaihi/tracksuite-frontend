import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import * as jwt from 'jsonwebtoken'
import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const {access_token} = (await (await fetch(process.env.BACKEND_URL + "/auth/login", {
          method: "POST",
          mode: "cors",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: credentials?.email, password: credentials?.password
          })
        })
        ).json())
        const userData = jwt.decode(access_token) || {}


        if (typeof userData == "object") {
          const user:User = { id: userData?.id, email: credentials?.email||"", access_token }
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if(user){
        token.accessToken = user.access_token
        token.id = user.id
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if(typeof token.accessToken=='string' && typeof token.id=='string'){
        session.user.access_token = token.accessToken
        session.user.id = token.id
      }
      
      return session
    }
  }
})

export { handler as GET, handler as POST }