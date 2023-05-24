import { appUrl } from "@/lib/constants";

export async function fetchPlayerData() {
  try {
    const { data } = await (await fetch(`${appUrl}/players`)).json();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
