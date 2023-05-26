/**
 * Seeding the character table.
 */

import { PrismaClient } from "@prisma/client";

const CHARACTERS = [
  { key: "DR_MARIO", name: "Dr. Mario" },
  { key: "MARIO", name: "Mario" },
  { key: "BOWSER", name: "Bowser" },
  { key: "PEACH", name: "Peach" },
  { key: "YOSHI", name: "Yoshi" },
  { key: "DONKEY_KONG", name: "Donkey Kong" },
  { key: "CAPTAIN_FALCON", name: "Captain Falcon" },
  { key: "GANONDORF", name: "Ganondorf" },
  { key: "FALCO", name: "Falco" },
  { key: "FOX", name: "Fox" },
  { key: "NESS", name: "Ness" },
  { key: "ICE_CLIMBERS", name: "Ice Climbers" },
  { key: "KIRBY", name: "Kirby" },
  { key: "SAMUS", name: "Samus" },
  { key: "SHEIK", name: "Sheik" },
  { key: "ZELDA", name: "Zelda" },
  { key: "LINK", name: "Link" },
  { key: "LUIGI", name: "Luigi" },
  { key: "YOUNG_LINK", name: "Young Link" },
  { key: "PICHU", name: "Pichu" },
  { key: "PIKACHU", name: "Pikachu" },
  { key: "JIGGLYPUFF", name: "Jigglypuff" },
  { key: "GAME_AND_WATCH", name: "Game & Watch" },
  { key: "MARTH", name: "Marth" },
  { key: "ROY", name: "Roy" },
  { key: "MEWTWO", name: "Mewtwo" },
];

export async function main(prisma: PrismaClient) {
  const charData = CHARACTERS.map((c) => {
    return { id: c.key, name: c.name };
  });

  const characters = await prisma.character
    .createMany({
      data: charData,
    })
    .catch((e) => console.log("Error creating many", e))
    .finally(() => {
      console.log("Finished updating database.");
    });

  console.log("Created characters: ", characters);
}
