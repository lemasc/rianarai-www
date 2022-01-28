import { NextApiHandler } from "next";
import { withAPISession } from "@/shared/session";

const signout: NextApiHandler = async (req, res) => {
  req.session.portal = undefined;
  await req.session.save();
  res.redirect("/portal/signin");
};

export default withAPISession(signout);
