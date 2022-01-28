import type { GetServerSideProps, NextApiHandler } from "next";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { InsiderBackEndForm } from "@/types/insider";

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "ra_insider",
};

export function withSession(handler: GetServerSideProps) {
  return withIronSessionSsr(handler, sessionOptions);
}

export function withAPISession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

declare module "iron-session" {
  interface IronSessionData {
    code?: string;
    portal?: {
      loginState?: string;
      user?: InsiderBackEndForm;
    };
  }
}
