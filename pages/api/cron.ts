import { updatePlayerData } from "@/services/cron";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  //   Get current db player data.
  await updatePlayerData();
  console.log("done!");

  response.status(200).json({ success: true });
}
