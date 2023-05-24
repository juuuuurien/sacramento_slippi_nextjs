import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import PlayerTable from "@/components/PlayerTable";
import { HeaderData } from "@/lib/global";
import { fetchPlayerData } from "@/services/players.service";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession(authOptions);

  const playerData = await fetchPlayerData();
  console.log(playerData);

  const headerData: HeaderData[] = [
    { title: "Rank" },
    { title: "Player" },
    { title: "Characters" },
    { title: "Rating" },
    { title: "W/L", style: "text-right" },
  ];
  return (
    <main className={styles.main}>
      <PlayerTable headerData={headerData} playerData={[]} />
    </main>
  );
}
