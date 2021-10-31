import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { withIronSession, Handler, Session } from "next-iron-session";

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "ra_insider",
  ttl: 120,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSession<P extends { [key: string]: any } = { [key: string]: any }>(
  handler: SSRHandler<P>
) {
  return withIronSession(handler, sessionOptions);
}

export function withAPISession<P extends { [key: string]: any } = { [key: string]: any }>(
  handler: Handler<NextApiSessionRequest, NextApiResponse<P>>
) {
  return withIronSession(handler, sessionOptions);
}

export type SSRContext = GetServerSidePropsContext & {
  req: GetServerSidePropsContext["req"] & { session: Session };
};

type SSRHandler<P> = (context: SSRContext) => Promise<GetServerSidePropsResult<P>>;
export type APIHandler<P> = Handler<NextApiSessionRequest, NextApiResponse<P>>;

export type NextApiSessionRequest = NextApiRequest & {
  session: Session;
};
