import { OAuth2Client } from "google-auth-library";
import { NextApiRequest } from "next";

export function createOAuth2(req: NextApiRequest) {
  const proto = req.headers?.host?.includes("localhost") ? "http" : "https";
  const callbackUrl =
    proto + "://" + req.headers.host + req.url?.split("?")[0].slice(0, req.url.lastIndexOf("/"));
  return new OAuth2Client(
    process.env.GCLIENT_ID,
    process.env.GCLIENT_SECRET,
    callbackUrl.includes("callback") ? callbackUrl : callbackUrl + "/callback"
  );
}

export type ErrorCodes = "user_not_found" | "server_error" | "api_error";

export class ErrorWithCode extends Error {
  code: ErrorCodes;
  constructor(message: string, code: ErrorCodes) {
    super(message);
    this.code = code;
  }
}
