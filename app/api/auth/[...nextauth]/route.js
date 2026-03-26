import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        // IMPORTANTE: Retornar o role aqui
        return {
          id: user.id,
          email: user.email,
          role: user.role, 
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Se o user existe (no momento do login), passa o role para o token
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      // Passa o role do token para a sessão
      if (session.user) session.user.role = token.role;
      return session;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };