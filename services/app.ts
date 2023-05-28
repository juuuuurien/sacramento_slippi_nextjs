import { appUrl } from "@/lib/constants";

export async function fetchSiteData() {
  const res = await (
    await fetch(`${appUrl}/site`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();
  return res;
}
