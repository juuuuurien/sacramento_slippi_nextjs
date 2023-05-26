import { fetchSlippiPlayerData } from "../../services/players";
import { PrismaClient } from "@prisma/client";

export async function main(prisma: PrismaClient) {
  // Migration code here
  const slippiData = await fetchSlippiPlayerData("JUUU#304");
  console.log(slippiData);
}
