import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
            // credentials,
          }),
        });
        const user = await res.json();
        // console.log(user);
        if (user?.error) {
          throw new Error(user.error); // Throw error if login fails
        }
        // if (user) {
        return {
          id: user.userid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        };
        // }
        // return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/loginscreen",
    signOut: "/auth/loginscreen",
    newUser: "/auth/registrationscreen",
  },

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
