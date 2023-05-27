export type Rank = {
  name: string;
  rating: number;
  img: string;
  style: string;
};

export class SlippiRank {
  constructor(rating: number) {
    this.rating = rating;
  }

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

  public getRank(): Rank {
    for (let i = 0; i < this.thresholds.length; i++) {
      if (this.rating < this.thresholds[i]) {
        return {
          name: this.ranks[i - 1],
          rating: this.rating,
          img: `/img/rankings/${this.images[i - 1]}`,
          style: `todo: fix this`,
        };
      }
    }

    return {
      name: this.ranks[this.ranks.length - 1],
      rating: this.rating,
      img: `/img/rankings/${this.images[this.images.length - 1]}`,
      style: `todo: fix this`,
    }; // Return the highest rank if the rating is above the last threshold
  }
}
