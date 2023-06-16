import { appUrl } from "@/lib/constants";

export async function fetchPlayerData() {
  const res = await (
    await fetch(`${appUrl}/players`, {
      cache: "no-store",
    })
  ).json();
  return res;
}
