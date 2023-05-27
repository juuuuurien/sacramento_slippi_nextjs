import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/*
 * @params {Request} request
 * @returns site data object.
 */
export async function GET() {
  try {
    const siteData = await prisma.siteStats.findFirst();

    return NextResponse.json({
      status: 200,
      error: false,
      data: siteData,
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
