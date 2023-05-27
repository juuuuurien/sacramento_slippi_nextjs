import { appUrl } from "@/lib/constants";

export async function fetchSiteData() {
  const res = await (await fetch(`${appUrl}/site`)).json();
  return res;
}
