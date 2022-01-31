//https://api.github.com/repos/lemasc/rianarai-pc-insider/releases/latest

import { ErrorWithCode } from "@/shared/api";
import { withAPISession } from "@/shared/session";
import axios from "axios";
import { NextApiHandler } from "next";

type GithubAssets = {
  name: string;
  browser_download_url: string;
};

type GithubAPI = {
  assets: GithubAssets[];
};

const downloadWindows: NextApiHandler = async (req, res) => {
  try {
    if (req.method !== "GET" || !req.session.portal)
      return res.status(400).json({ success: false });
    const { data } = await axios.get<GithubAPI>(
      `https://api.github.com/repos/${process.env.GITHUB_PC_REPO}/releases/latest`
    );
    const targetFile = data.assets.filter((d) => d.name.endsWith(".exe"));

    if (targetFile.length !== 1)
      throw new ErrorWithCode("Cannot select download assets", "api_error");

    const downloadUrl = targetFile[0].browser_download_url;
    if (!downloadUrl) throw new Error("Cannot get download url");
    res.redirect(downloadUrl);
  } catch (err) {
    console.error(err);
    if (err instanceof ErrorWithCode) {
      res.status(500).json({ success: false, message: err.message, code: err.code });
    } else {
      res.status(500).json({ success: false, message: "Server Error", code: "server_error" });
    }
  }
};
export default withAPISession(downloadWindows);
