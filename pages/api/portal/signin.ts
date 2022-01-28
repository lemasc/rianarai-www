import { NextApiHandler } from "next";
import { createOAuth2 } from "@/shared/api";
import { nanoid } from "@/shared/nanoid";
import { withAPISession } from "@/shared/session";

const signin: NextApiHandler = async (req, res) => {
  try {
    if (req.method !== "GET") return res.status(400).json({ success: false });
    const state = nanoid();

    const client = createOAuth2(req);
    const url = client.generateAuthUrl({
      scope: ["openid", "email", "profile"],
      hd: "wpm.pnru.ac.th",
      state,
    });

    req.session.portal = {
      loginState: state,
    };
    await req.session.save();
    res.redirect(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
export default withAPISession(signin);
