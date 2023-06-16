import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSlippiData } from "@/services/slippi";
/*
 * @params {Request} request
 * @returns site data object.
 */
export async function GET() {
  try {
    const connectCodes = await prisma.player
      .findMany({
        select: {
          connect_code: true,
        },
      })
      .then((res) => {
        return res.map((player) => {
          return player.connect_code;
        });
      });

    const data = await getSlippiData(
      connectCodes[connectCodes.indexOf("JUUU#304")]
    );

    return NextResponse.json({
      status: 200,
      error: false,
      data: data,
      message: "Successfully retrieved site data.",
    });
  } catch (e) {
    console.log("Error getting site data. ", e);
    return NextResponse.json({
      status: 500,
      error: true,
      data: null,
      message: "Error retrieving site data. " + e,
    });
  }
}
