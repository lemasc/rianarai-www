import type { NextApiHandler } from "next";
import { withAPISession } from "@/shared/session";
import { createOAuth2, ErrorWithCode } from "@/shared/api";
import { InsiderBackEndForm } from "@/types/insider";
import axios from "axios";

type ApiResponse = {
  error?: Record<string, any>;
  items: InsiderBackEndForm[];
};

type UserInfo = {
  id: string;
  email: string;
  verfied_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

const listUserByEmail = async (email: string) => {
  const { data } = await axios.get<ApiResponse>(process.env.API_ENDPOINT as string, {
    params: {
      path: "/users",
      query: JSON.stringify({ email }),
    },
  });
  if (data.error) throw new ErrorWithCode("API returned an error", "api_error");
  return data.items;
};

const OAuth2Callback: NextApiHandler = async (req, res) => {
  if (!req.query.code || !req.query.state || req.query.state !== req.session.portal?.loginState) {
    req.session.portal = undefined;
    await req.session.save();
    res.redirect("/portal/signin?error" + req.query.error);
  } else {
    try {
      const oAuth2Client = createOAuth2(req);
      const { tokens } = await oAuth2Client.getToken(req.query.code as string);
      oAuth2Client.setCredentials(tokens);
      const { data } = await oAuth2Client.request<UserInfo>({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
      });
      const users = await listUserByEmail(data.email);
      if (users.length === 0) throw new ErrorWithCode("Not registered", "user_not_found");
      const actualUser = users.reverse()["0"];
      req.session.code = actualUser["#"];
      req.session.portal = {
        user: actualUser,
      };
      await req.session.save();
      res.redirect("/portal");
    } catch (err) {
      console.error(err);
      req.session.portal = undefined;
      await req.session.save();
      res.redirect(
        "/portal/signin?error=" + (err instanceof ErrorWithCode ? err.message : "server_error")
      );
    }
  }
};

export default withAPISession(OAuth2Callback);
