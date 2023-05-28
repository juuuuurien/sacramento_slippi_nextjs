import { Inter } from "next/font/google";
import styles from "./page.module.css";

import PlayerTable, { LoadingTable } from "@/components/PlayerTable";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Suspense fallback={<LoadingTable />}>
        {/* @ts-expect-error Server Component */}
        <PlayerTable />
      </Suspense>
    </main>
  );
}
