import { Player } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchData = async () => {
  const res = await fetch("https://sacslippi.com/api/players");
  return await res.json();
};

async function main() {
  const response = await fetchData();
  const playerArray = response.map((p: Player) => {
    return { player_tag: p.player_tag, connect_code: p.connect_code, approved: !!p.approved };
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

main()
  .catch((err) => {
    console.warn("Error seeding db. -->", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
