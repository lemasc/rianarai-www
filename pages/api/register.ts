import { NextApiRequest } from "next";
import axios from "axios";
// Netlify imports only non-secure apis for no reason.
import { nanoid } from "nanoid/non-secure";
import { getClientIp } from "@supercharge/request-ip";
import Ajv, { JSONSchemaType } from "ajv";
import { InsiderResponse, InsiderFrontEndForm } from "@/types/insider";
import { APIHandler, withAPISession } from "@/shared/session";

type ApiResponse = {
  errors: Record<string, any>;
};

const ajv = new Ajv();

const schema: JSONSchemaType<InsiderFrontEndForm> = {
  type: "object",
  properties: {
    name: { type: "string" },
    surname: { type: "string" },
    email: { type: "string" },
    devices: {
      type: "object",
      properties: {
        android: { type: "boolean" },
        ios: { type: "boolean" },
        windows: { type: "boolean" },
      },
      required: ["android", "ios", "windows"],
    },
    confirm: { type: "boolean" },
    confirmRights: { type: "boolean" },
  },
  required: ["name", "surname", "email", "devices", "confirm", "confirmRights"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

async function verifyRecaptcha(req: NextApiRequest) {
  try {
    const token = req.headers.authorization;
    if (!token) return false;
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      new URLSearchParams({
        secret: process.env.RECAPTCHA as string,
        response: token.split(" ")[1] as string,
        remoteip: getClientIp(req) as string,
      })
    );
    return response.data && response.data.success;
  } catch (err) {
    return false;
  }
}

const register: APIHandler<InsiderResponse> = async (req, res) => {
  try {
    if (
      req.method !== "POST" ||
      !(await verifyRecaptcha(req)) ||
      !validate(req.body) ||
      !(req.body.confirm && req.body.confirmRights)
    )
      return res.status(400).json({ success: false });
    const id = nanoid(7);

    const postData = {
      "#": id,
      date: new Date().toISOString(),
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      devices_windows: req.body.devices.windows,
      devices_android: req.body.devices.android,
      devices_ios: req.body.devices.ios,
    };
    const { data } = await axios.post<ApiResponse>(process.env.API_ENDPOINT as string, postData, {
      params: {
        path: "/users",
      },
    });
    if (Object.keys(data.errors).length > 0) throw new Error("API returned an error.");

    req.session.set("code", id);
    await req.session.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
export default withAPISession(register);
