import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { characterImages } from "@/lib/constants";
import { HeaderData, PlayerData } from "@/lib/global";
import { SlippiRank } from "@/lib/ranking";
import { cn, getRowStyle } from "@/lib/utils";
import { fetchSiteData } from "@/services/app";
import { fetchPlayerData } from "@/services/players";
import { Prisma } from "@prisma/client";
import type { Player, PlayerCharacter, DailyPlayerStats } from "@prisma/client";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const LoadingTable = () => {
  return (
    <Table>
      <TableCaption>{dayjs().format("MMMM Do, YYYY")}</TableCaption>
      <TableHeader>
        <TableRow></TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="flex flex-row justify-center items-center min-h-[200px]">
          <TableCell>
            <svg
              className="animate-spin"
              width="36"
              height="36"
              fill="#fff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                opacity=".25"
              />
              <circle className="spinner_7WDj" cx="12" cy="2.5" r="1.5" />
            </svg>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

async function PlayerTable() {
  dayjs.extend(advancedFormat);

  const playerDataPromise = fetchPlayerData();
  const siteDataPromise = fetchSiteData();

  const [playerData, siteData] = await Promise.all([
    playerDataPromise,
    siteDataPromise,
  ]);

  const headerData: HeaderData[] = [
    { title: "Rank", style: "text-center" },
    { title: "", style: "text-center pl-10" },
    { title: "Player", style: "text-right" },
    { title: "Rating", style: "text-center" },
    { title: "W/L", style: "text-center pr-10" },
  ];

  let timeDiff;
  let nextUpdate;
  const minuteDiff = dayjs().diff(dayjs(siteData.data.updatedAt), "minute");
  const hourDiff = dayjs().diff(dayjs(siteData.data.updatedAt), "hour");
  const dayDiff = dayjs().diff(dayjs(siteData.data.updatedAt), "day");

  if (minuteDiff <= 60) {
    timeDiff = `${minuteDiff < 1 ? "< 1" : minuteDiff}min ago`;
  } else if (hourDiff <= 24) {
    timeDiff = `${hourDiff} ${hourDiff > 1 ? "hrs" : "hr"} ago`;
  } else {
    timeDiff = `${dayDiff} d ago`;
  }

  nextUpdate = dayjs
    .tz(siteData.data.updatedAt, "America/Los_Angeles")
    .add(30, "minute")
    .subtract(7, "hour")
    .format("h:mm A");

  return (
    <>
      <div className="flex flex-row justify-between w-full my-10">
        <span>Updated {timeDiff}</span>
        <span>Next Update: {nextUpdate} PST</span>
      </div>
      <Table className="bg-slate-950 bg-opacity-40">
        <TableCaption>{dayjs().format("MMMM Do, YYYY")}</TableCaption>

        <TableBody className="rounded-xl overflow-hidden">
          {playerData?.data?.map((player: PlayerData) => {
            const rankData = new SlippiRank(
              player.slippi_rating,
              player.slippi_wins,
              player.slippi_losses
            );
            const playerCharacters = player.characters
              .sort((a, b) => b.gameCount - a.gameCount)
              .splice(0, 3);
            const totalChars = player.characters.length;
            const totalGameCount = playerCharacters
              .map((pc) => pc.gameCount)
              .reduce((acc, gc) => acc + gc, 0);

            const rowStyle = cn("border-b-[#092652]", rankData.style);
            return (
              <TableRow className={`${rowStyle}`} key={player.connect_code}>
                <TableCell className="font-semibold text-center">
                  <div className="relative">
                    <span className="text-3xl">{`${player.rank}`}</span>
                    <span className="absolute right-[-0.5rem] bottom-[0.25rem]">
                      {player.dailyStats.daily_rank &&
                        player.rank < player.dailyStats.daily_rank && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-6 h-6 text-green-400 inline-block ml-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      {player.dailyStats.daily_rank &&
                        player.rank > player.dailyStats.daily_rank && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-6 h-6 text-red-400 inline-block ml-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="relative hidden lg:flex flex-row h-[110px] p-0 pl-0 xl:pl-10 mix-blend-plus-lighter">
                  <div className="group relative w-full min-w-[100px] max-w-[160px] m-0 min-h-full overflow-hidden">
                    <div className="absolute w-full h-full">
                      <Image
                        alt="player"
                        fill
                        src={`/img/portraits/${
                          characterImages.get(playerCharacters[0].characterId)
                            ?.portrait
                        }`}
                        className="object-cover object-top opacity-60 transition-all saturate-[0.85] hover:opacity-100 hover:saturate-100"
                      />
                    </div>
                    <span className="absolute p-1 px-2 bg-slate-800 text-white rounded-md right-5 top-1 text-xs opacity-0 transition-all group-hover:opacity-100">
                      {`${
                        Math.floor(
                          (playerCharacters[0].gameCount / totalGameCount) *
                            10000
                        ) / 100
                      }%`}
                    </span>
                  </div>
                  <div className="flex absolute bottom-[0.5rem] left-full">
                    <div className="relative flex flex-row self-end gap-1">
                      {playerCharacters.splice(1, 3).map((character) => {
                        return (
                          <div
                            key={`${character.characterId}`}
                            className="group relative min-w-[20px]"
                          >
                            <Image
                              key={`${character.characterId}`}
                              alt="character"
                              height="20"
                              width="20"
                              src={`/img/characters/${
                                characterImages.get(character.characterId)?.icon
                              }`}
                              className="opacity-60 transition-all hover:opacity-100"
                            />
                            <span className="absolute p-1 px-2 bg-slate-800 text-white rounded-md left-full bottom-full text-xs opacity-0 transition-all group-hover:opacity-100">
                              {`${
                                Math.floor(
                                  (character.gameCount / totalGameCount) * 10000
                                ) / 100
                              }%`}
                            </span>
                          </div>
                        );
                      })}
                      {totalChars > 3 && (
                        <span className="whitespace-nowrap text-xs">{`+${
                          totalChars - 3
                        } more`}</span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="w-full text-center lg:text-right overflow-x-hidden">
                    <div className="relative flex flex-col text-lg lg:text-xl uppercase font-extrabold italic break-words">
                      <span>{player.slippi_player_tag}</span>
                      <span className="font-normal text-sm text-slate-500">
                        {player.connect_code}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
                    <Image
                      alt="rank"
                      height="36"
                      width="36"
                      src={rankData.imgSrc}
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-center text-md lg:text-lg uppercase whitespace-nowrap">
                        {rankData.rankName}
                      </span>
                      <span className="text-center lg:text-left lg:font-normal not-italic text-sm text-slate-500">
                        {rankData.displayRating}
                        <span className="">
                          {player.dailyStats.daily_slippi_rating &&
                            player.slippi_rating >
                              player.dailyStats.daily_slippi_rating && (
                              <span className="text-green-400 ml-1 text-xs whitespace-nowrap">{`+${
                                Math.floor(
                                  Math.abs(
                                    player.slippi_rating -
                                      player.dailyStats.daily_slippi_rating
                                  ) * 10
                                ) / 10
                              }`}</span>
                            )}
                          {player.dailyStats.daily_slippi_rating &&
                            player.slippi_rating <
                              player.dailyStats.daily_slippi_rating && (
                              <span className="text-red-400 ml-1 text-xs whitespace-nowrap">{`-${
                                Math.floor(
                                  Math.abs(
                                    player.slippi_rating -
                                      player.dailyStats.daily_slippi_rating
                                  ) * 10
                                ) / 10
                              }`}</span>
                            )}
                        </span>
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row justify-center items-center h-full text-center pr-10 gap-1 font-semibold text-md">
                    <span className="text-green-400">{`${player.slippi_wins}`}</span>
                    <span>{"/"}</span>
                    <span className="text-red-400">{`${player.slippi_losses}`}</span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default PlayerTable;
