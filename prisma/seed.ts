import { fetchSlippiPlayerData } from "../services/players";
import { Player } from "@/types";
import { PrismaClient, Prisma } from "@prisma/client";
import { PlayerCharacter, PlayerData, SlippiPlayerData } from "@/lib/global";
// import { main } from "./migrations/05_23_2023_seed_character_table";
// import { main } from "./migrations/05_23_2023_seed_player_table";
// import { main } from "./migrations/2023-05-24_1684912781_seed_players_with_slippi_data";
const prisma = new PrismaClient();

// need to reseed all the fucking data rip.

// const CHARACTERS = [
//   { key: "DR_MARIO", name: "Dr. Mario" },
//   { key: "MARIO", name: "Mario" },
//   { key: "BOWSER", name: "Bowser" },
//   { key: "PEACH", name: "Peach" },
//   { key: "YOSHI", name: "Yoshi" },
//   { key: "DONKEY_KONG", name: "Donkey Kong" },
//   { key: "CAPTAIN_FALCON", name: "Captain Falcon" },
//   { key: "GANONDORF", name: "Ganondorf" },
//   { key: "FALCO", name: "Falco" },
//   { key: "FOX", name: "Fox" },
//   { key: "NESS", name: "Ness" },
//   { key: "ICE_CLIMBERS", name: "Ice Climbers" },
//   { key: "KIRBY", name: "Kirby" },
//   { key: "SAMUS", name: "Samus" },
//   { key: "SHEIK", name: "Sheik" },
//   { key: "ZELDA", name: "Zelda" },
//   { key: "LINK", name: "Link" },
//   { key: "LUIGI", name: "Luigi" },
//   { key: "YOUNG_LINK", name: "Young Link" },
//   { key: "PICHU", name: "Pichu" },
//   { key: "PIKACHU", name: "Pikachu" },
//   { key: "JIGGLYPUFF", name: "Jigglypuff" },
//   { key: "GAME_AND_WATCH", name: "Game & Watch" },
//   { key: "MARTH", name: "Marth" },
//   { key: "ROY", name: "Roy" },
//   { key: "MEWTWO", name: "Mewtwo" },
// ];

// async function main() {
//   const charData = CHARACTERS.map((c) => {
//     return { id: c.key, name: c.name };
//   });

//   const characters = await prisma.character
//     .createMany({
//       data: charData,
//     })
//     .catch((e) => console.log("Error creating many", e))
//     .finally(() => {
//       console.log("Finished updating database.");
//     });

//   console.log("Created characters: ", characters);
// }

async function getSlippiData(cc: string) {
  const slippiQuery = `fragment userProfilePage on User {
    displayName
    connectCode {
        code
        }
    rankedNetplayProfile {
            id
            ratingOrdinal
            ratingUpdateCount
            wins
            losses
            dailyGlobalPlacement
            dailyRegionalPlacement
            continent
            characters {
                    id
                    character
                    gameCount
                }
        }
}
query AccountManagementPageQuery($cc: String!) {
    getConnectCode(code: $cc) {
            user {
                    ...userProfilePage
                }
        }
}`;

  const { data } = await (
    await fetch("https://gql-gateway-dot-slippi.uc.r.appspot.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "AccountManagementPageQuery",
        query: slippiQuery,
        variables: {
          cc: cc,
        },
      }),
    })
  ).json();

  return data;
}

const main = async () => {
  try {
    let playerData = await prisma.player.findMany({});
    let connectCodes = playerData.map((p) => {
      return p.connect_code;
    });
    // console.log(connectCodes);
    let promises: Promise<SlippiPlayerData>[] = [];
    connectCodes.forEach((cc) => {
      promises.push(getSlippiData(cc));
    });

    const results = await Promise.all(promises);
    const sortedResults = results.sort((a, b) => {
      return a.getConnectCode.user.rankedNetplayProfile.ratingOrdinal <
        b.getConnectCode.user.rankedNetplayProfile.ratingOrdinal
        ? 1
        : -1;
    });

    sortedResults.forEach((r, i) => {
      let rank = i + 1;
      r.getConnectCode.user.rank = rank;
    });

    // Update the database with the new rank data.
    let dbPromises = [];
    dbPromises.push(prisma.playerCharacter.deleteMany({})); // clear the playerCharacter table

    for (let r of sortedResults) {
      const currentPlayerData = playerData.find((p) => {
        return r.getConnectCode.user.connectCode.code === p.connect_code;
      });

      let currentRank = currentPlayerData?.rank;
      let currentSlippiRating = currentPlayerData?.slippi_rating ?? 0;

      const promise = prisma.player.update({
        where: {
          connect_code: r.getConnectCode.user.connectCode.code,
        },
        data: {
          rank: r.getConnectCode.user.rank,
          past_rank: currentRank,
          slippi_player_tag: r.getConnectCode.user.displayName,
          slippi_rating: new Prisma.Decimal(
            r.getConnectCode.user.rankedNetplayProfile.ratingOrdinal
          ),
          slippi_past_rating: new Prisma.Decimal(currentSlippiRating),
          slippi_daily_global_placement:
            r.getConnectCode.user.rankedNetplayProfile.dailyGlobalPlacement,
          slippi_daily_regional_placement:
            r.getConnectCode.user.rankedNetplayProfile.dailyRegionalPlacement,
          slippi_wins: r.getConnectCode.user.rankedNetplayProfile.wins ?? 0,
          slippi_losses: r.getConnectCode.user.rankedNetplayProfile.losses ?? 0,
          characters: {
            create: r.getConnectCode.user.rankedNetplayProfile.characters.map(
              (c) => {
                return {
                  characterId: c.character,
                  gameCount: c.gameCount,
                };
              }
            ),
          },
        },
      });

      dbPromises.push(promise);
    }

    const dbPromiseResults = await Promise.all(dbPromises);

    console.log("Done ---- ", dbPromiseResults);
  } catch (e) {
    console.error(e);
    return e;
  }
};

main()
  .catch((err) => {
    console.warn("Error seeding db. -->", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
