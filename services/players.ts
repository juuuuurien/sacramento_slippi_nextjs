import { appUrl } from "@/lib/constants";

export async function fetchPlayerData() {
  const res = await (
    await fetch(`${appUrl}/players`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();
  return res;
}
