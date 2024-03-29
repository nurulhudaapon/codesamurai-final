import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { getPermissions, login } from "./server";
import { SessionData } from "@/types/auth";
import { Utils } from "@/utils";

export const authOptions: NextAuthOptions = {
  secret: process.env["JWT_SECRET"],
  callbacks: {
    jwt: async (props) => {
      const token = props.token as SessionData;
      const user = props.user as SessionData;

      if (user?.id) {
        return {
          ...user,
          expired_at: Utils.Time.addDays(new Date(), 7),
        };
      }

      if (token.expired_at && !Utils.Time.isPastDate(token.expired_at)) {
        return token;
      } else {
        return Promise.reject({
          error: new Error("Invalid token!"),
        });
      }
    },
    session: async (props) => {
      const token = props?.token as SessionData;
      let session = props?.session;
      const permission = await getPermissions({ email: token.email });
      token.permission = permission;
      session = { ...session, ...token };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const res = await login({
          email: credentials?.email,
          password: credentials?.password,
        });
        return res;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
