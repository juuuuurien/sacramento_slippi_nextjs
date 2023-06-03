import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRowStyle(displayRank: string) {
  const styleMap = new Map([
    [
      "Bronze",
      "bg-gradient-to-l from-[#67360845] from-33% via-[#4424071a] to-[#00000000] to-100%",
    ],
    [
      "Silver",
      "bg-gradient-to-l from-[#444a5545] from-33% via-[#292e361a] to-[#00000000] to-100%",
    ],
    [
      "Gold",
      "bg-gradient-to-l from-[#66660045] from-33% via-[#4f45041a] to-[#00000000] to-100%",
    ],
    [
      "Platinum",
      "bg-gradient-to-l from-[#00665f40] from-33% via-[#044f4e1a] to-[#00000000] to-100%",
    ],
    [
      "Diamond",
      "bg-gradient-to-l from-[#00277740] from-33% via-[#04074f1a] to-[#00000000] to-100%",
    ],
    [
      "Master",
      "bg-gradient-to-l from-[#18006666] from-33% via-[#16044f1a] to-[#00000000] to-100%",
    ],
  ]);

  // Use regex to get only letters from displayRank.
  const rank = displayRank.match(/[a-zA-Z]+/);
  if (rank) {
    return styleMap.get(rank[0]);
  }
}
