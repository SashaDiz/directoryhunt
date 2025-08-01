// Client-side auth configuration for Vercel deployment
export const authConfig = {
  pages: {
    signIn: "/signin",
    verifyRequest: "/verify-request",
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};
