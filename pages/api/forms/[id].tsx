import { NextApiRequest, NextApiResponse } from "next";
import { getFormEndpoint, getUserAgentInputKey } from "../../../lib";
import fetch from "isomorphic-fetch";
import qs from "querystring";

/**
 * TODO:
 *
 * Get -> Will return meta
 * Post -> Will submit form
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const endpoint = getFormEndpoint(id);
  const body = req.body;
  // Inject user-agent
  const userAgentInputKey = getUserAgentInputKey(body);
  if (userAgentInputKey) {
    body[userAgentInputKey] = req.headers["user-agent"];
  }

  try {
    const fetchRes = await fetch(endpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify(body),
    });

    res.status(200).send(fetchRes.status);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};
