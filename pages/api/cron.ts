import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log("I should update db tables now!");
  response.status(200).json({ success: true });
}
