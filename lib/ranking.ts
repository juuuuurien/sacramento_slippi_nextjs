export type Rank = {
  name: string;
  rating: number;
  img: string;
  style: string;
};

export class SlippiRank {
  private rating: number;
  private ranks: string[] = [
    "Bronze 1",
    "Bronze 2",
    "Bronze 3",
    "Silver 1",
    "Silver 2",
    "Silver 3",
    "Gold 1",
    "Gold 2",
    "Gold 3",
    "Platinum 1",
    "Platinum 2",
    "Platinum 3",
    "Diamond 1",
    "Diamond 2",
    "Diamond 3",
    "Master 1",
    "Master 2",
    "Master 3",
    "Grandmaster",
  ]; // Add more ranks as needed

  private thresholds: number[] = [
    0, 766, 914, 1055, 1180, 1316, 1436, 1549, 1654, 1752, 1843, 1928, 2004,
    2074, 2137, 2192, 2275, 2350,
  ];

  // bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%

  private styles: string[] = [
    `bg-gradient-to-r from-[#67360824] from-10% via-[#4424071a] to-[#00000000] to-90%`, // Bronze
    `bg-gradient-to-r from-[#444a5540] from-10% via-[#292e361a] to-[#00000000] to-90%`, // Silver
    `bg-gradient-to-r from-[#66660040] from-10% via-[#4f45041a] to-[#00000000] to-90%`, // Gold
    `bg-gradient-to-r from-[#00665f40] from-10% via-[#044f4e1a] to-[#00000000] to-90%`, // Plat
    `bg-gradient-to-r from-[#00276640] from-10% via-[#04074f1a] to-[#00000000] to-90%`, // Diamond
    `bg-gradient-to-r from-[#18006640] from-10% via-[#16044f1a] to-[#00000000] to-90%`, // Master
    // `bg-[#67360824]`, // Bronze
    // `bg-[#444a5540]`, // Silver
    // `bg-[#66660040]`, // Gold
    // `bg-[#00665f40]`, // Plat
    // `bg-[#00276640]`, // Diamond
    // `bg-[#18006640]`, // Master
  ];

  private images: string[] = [
    "bronze_1.svg",
    "bronze_2.svg",
    "bronze_3.svg",
    "silver_1.svg",
    "silver_2.svg",
    "silver_3.svg",
    "gold_1.svg",
    "gold_2.svg",
    "gold_3.svg",
    "platinum_1.svg",
    "platinum_2.svg",
    "platinum_3.svg",
    "diamond_1.svg",
    "diamond_2.svg",
    "diamond_3.svg",
    "master_1.svg",
    "master_2.svg",
    "master_3.svg",
    "grandmaster.svg",
  ];

  public rankName: string;
  public displayRating: number;
  public imgSrc: string;
  public style: string;

  //   Todo: Update grandmaster, no rank, and pending logic.
  constructor(rating: number, wins: number, losses: number) {
    this.rating = rating;

    for (let i = 0; i < this.thresholds.length; i++) {
      if (this.rating < this.thresholds[i]) {
        this.rankName = this.ranks[i - 1];
        // round rating to first decimal
        this.displayRating = Math.floor(this.rating * 10) / 10;
        this.imgSrc = `/img/rankings/${this.images[i - 1]}`;
        this.style = this.styles[Math.floor((i - 1) / 3)];

        return;
      }
    }

    // Return the highest rank if the rating is above the last threshold
    this.rankName = this.ranks[this.ranks.length - 1];
    this.displayRating = Math.floor(this.rating);
    this.imgSrc = `/img/rankings/${this.images[this.images.length - 1]}`;
    this.style = `todo: fix this`;
  }

  public getRankStyle(): string | undefined {
    for (let i = 0; i < this.thresholds.length; i++) {
      if (this.rating < this.thresholds[i]) {
        return this.styles[Math.floor((i - 1) / 3)].toString();
      }
    }
  }
}
