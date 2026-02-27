import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        const user = await res.json();
         console.log("DUMMY RESPONSE:", user);
        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.accessToken = user.accessToken;
      token.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      };
    }
    return token;
  },

  async session({ session, token }) {
    session.user = token.user;
    session.accessToken = token.accessToken;
    return session;
  },
},
});

export { handler as GET, handler as POST };