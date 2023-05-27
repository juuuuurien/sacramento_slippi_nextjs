import { appUrl } from "@/lib/constants";

export async function fetchPlayerData() {
  const res = await (await fetch(`${appUrl}/players`)).json();
  console.log("rezz: ", res);
  return res;
}
