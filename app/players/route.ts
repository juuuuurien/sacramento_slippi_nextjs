import { Player } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const revalidate = 0;
/*
 * @params {Request} request
 * @returns Array of all players
 */
export async function GET() {
  try {
    const players = await prisma.player.findMany({
      orderBy: { rank: "asc" },
      include: {
        characters: true,
      },
    });
    // console.log("Successfully retrieved players. ", players);
    return NextResponse.json({
      status: 200,
      error: false,
      data: players,
      message: "Successfully retrieved players.",
    });
  } catch (e) {
    console.log("Error getting players. ", e);
    return NextResponse.json({
      status: 500,
      error: true,
      data: null,
      message: "Error retrieving players. " + e,
    });
  }
}

/*
 * @params {Request} request.
 * @returns Response with the newly created player or error.
 * @description Creates a new player in the database.
 */
export async function POST(request: Request) {
  const { player_tag, connect_code, approved } =
    request.body as unknown as Player;

  try {
    const player = await prisma.player.create({
      data: {
        player_tag,
        connect_code,
        approved,
      },
    });

    return NextResponse.json({
      status: 200,
      error: false,
      data: player,
      message: `Successfully added player ${player_tag} .`,
    });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      error: true,
      data: null,
      message: `Error adding player ${player_tag}.`,
    });
  }
}
