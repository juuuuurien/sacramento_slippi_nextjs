import { Inter } from "next/font/google";
import styles from "./page.module.css";

import PlayerTable from "@/components/PlayerTable";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Sac Slippi</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <PlayerTable />
      </Suspense>
    </main>
  );
}
