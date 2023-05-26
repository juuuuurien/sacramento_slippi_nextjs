import { Player } from "@/types";
import { PrismaClient } from "@prisma/client";

const fetchData = async () => {
  const res = await fetch("https://sacslippi.com/api/players");
  return await res.json();
};

export async function main(prisma: PrismaClient) {
  /**
   * Seeding the player table.
   * No Date.
   */

  const response = await fetchData();
  const playerArray = response.map((p: Player) => {
    return {
      player_tag: p.player_tag,
      connect_code: p.connect_code,
      approved: !!p.approved,
    };
  });

  console.log(playerArray);
  // return;

  const players = await prisma.player
    .createMany({
      data: playerArray,
    })
    .catch((e) => console.log("Error creating many", e))
    .finally(() => {
      console.log("Finished updating database.");
    });

  console.log("Created players: ", players);
}
