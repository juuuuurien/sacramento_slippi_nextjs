import type { DailyPlayerStats } from "@prisma/client";

export type HeaderData = {
  title: string;
  style?: string;
  headerStyle?: string;
};

export type PlayerData = {
  id: string;
  player_tag: string;
  connect_code: string;
  approved: boolean;
  rank: number;
  past_rank: number;
  slippi_player_tag: string;
  slippi_rating: number;
  slippi_past_rating: number;
  slippi_wins: number;
  slippi_losses: number;
  slippi_daily_global_placement: number;
  slippi_daily_regional_placement: number;
  createdAt: string;
  updatedAt: string;
  characters: Array<PlayerCharacter>;
  dailyStats: DailyPlayerStatsData;
};

export type DailyPlayerStatsData = {
  id: string;
  playerId: string;
  daily_rank: number;
  daily_slippi_rating: number;
  createdAt: string;
  updatedAt: string;
};

export type SlippiPlayerData = {
  getConnectCode: {
    user: {
      rank: null | number;
      displayName: string;
      connectCode: {
        code: string;
      };
      rankedNetplayProfile: {
        id: string;
        ratingOrdinal: number;
        ratingUpdateCount: number;
        wins: number;
        losses: number;
        dailyGlobalPlacement: null | number; // The data type depends on the actual value.
        dailyRegionalPlacement: null | number; // The data type depends on the actual value.
        continent: string;
        characters: Array<{
          id: string;
          character: string;
          gameCount: number;
        }>;
      };
    };
  };
};

export type PlayerCharacter = {
  id: string;
  playerId: string;
  characterId: string;
  gameCount: number;
};
