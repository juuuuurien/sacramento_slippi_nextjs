import { SlippiPlayerData } from "@/lib/global";
import { Prisma, PrismaClient } from "@prisma/client";
import { getSlippiData } from "./slippi";

export async function updatePlayerData() {
  const prisma = new PrismaClient();
  const timer = console.time("Cron");
  try {
    let playerData = await prisma.player.findMany({});
    let connectCodes = playerData.map((p) => {
      return p.connect_code;
    });

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

    // Add local leaderboard rank to each player.
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

    dbPromises.push(
      prisma.siteStats.upsert({
        create: {
          totalPlayers: sortedResults.length,
        },
        update: {
          totalPlayers: sortedResults.length,
        },
        where: {
          id: 1,
        },
      })
    );

    await Promise.all(dbPromises);
    console.log("---- Done Cron ----");
    console.timeEnd("Finished in");
  } catch (e) {
    console.error(e);
    return e;
  } finally {
    await prisma.$disconnect();
  }
}
