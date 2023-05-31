import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HeaderData, PlayerData } from "@/lib/global";
import { SlippiRank } from "@/lib/ranking";
import { fetchSiteData } from "@/services/app";
import { fetchPlayerData } from "@/services/players";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Image from "next/image";
import { characterImages } from "@/lib/constants";
import { cn } from "@/lib/utils";
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

// type TableProps = {
//   headerData: HeaderData[];
//   playerData: PlayerData[];
// };

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

async function wait() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
async function PlayerTable() {
  dayjs.extend(advancedFormat);

  const playerDataPromise = fetchPlayerData();
  const siteDataPromise = fetchSiteData();

  const [playerData, siteData] = await Promise.all([
    playerDataPromise,
    siteDataPromise,
    wait(),
  ]);

  const headerData: HeaderData[] = [
    { title: "Rank", style: "text-center" },
    { title: "", style: "text-center pl-10" },
    { title: "Player", style: "text-right" },
    // { title: "Characters", style: "text-center" },
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

  // Next update is 30 min after last update.
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
        {/* <TableHeader>
          <TableRow className="bg-slate-900 border-[#092652] border-0 border-t-[#092652]">
            {headerData.map((header) => (
              <TableHead key={header.title}>
                <div className={` ${header.style} `}>{header.title}</div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader> */}
        <TableBody>
          {playerData?.data.map((player: PlayerData) => {
            const rankData = new SlippiRank(player.slippi_rating);
            const playerCharacters = player.characters
              .sort((a, b) => b.gameCount - a.gameCount)
              .splice(0, 3);
            return (
              <TableRow
                className={cn(
                  "border-b-[#092652] bg-gradient-to-l via-[#4424071a] from-[#67360824] to-[#00000000]",
                  rankData.style
                )}
                key={player.connect_code}
              >
                <TableCell className="font-semibold text-center text-3xl">
                  <div className="relative">
                    <span>{player.rank}</span>
                    <span className="absolute right-0 bottom-0">
                      {player.rank < player.past_rank && (
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
                      {player.rank > player.past_rank && (
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
                <TableCell className="flex flex-row h-[110px] p-0 pl-0 xl:pl-10">
                  <div className="relative w-full min-w-[100px] max-w-[160px] m-0 min-h-full overflow-hidden">
                    <Image
                      alt="player"
                      height={160}
                      width={140}
                      src={`/img/portraits/${
                        characterImages.get(playerCharacters[0].characterId)
                          ?.portrait
                      }`}
                      className="absolute object-cover opacity-90 transition-all saturate-[0.65] hover:opacity-100 hover:saturate-100"
                    />
                  </div>
                  <div className="flex w-[40px] py-2">
                    <div className="flex flex-row self-end">
                      {playerCharacters.splice(1, 3).map((character) => {
                        return (
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
                        );
                      })}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-[110px] p-0">
                  <div className="w-full text-right overflow-x-hidden text-ellipsis">
                    <span className="relative flex flex-col text-lg md:text-2xl uppercase font-extrabold italic">
                      {player.slippi_player_tag}
                      <span className="font-semibold not-italic text-sm text-slate-500">
                        {rankData.displayRating}
                        <span className="">
                          {player.slippi_rating > player.slippi_past_rating && (
                            <span className="text-green-400 ml-1 text-xs whitespace-nowrap">{`+${
                              Math.floor(
                                Math.abs(
                                  player.slippi_rating -
                                    player.slippi_past_rating
                                ) * 10
                              ) / 10
                            }`}</span>
                          )}
                          {player.slippi_rating < player.slippi_past_rating && (
                            <span className="text-red-400 ml-1 text-xs whitespace-nowrap">{`-${
                              Math.floor(
                                Math.abs(
                                  player.slippi_rating -
                                    player.slippi_past_rating
                                ) * 10
                              ) / 10
                            }`}</span>
                          )}
                        </span>
                      </span>
                    </span>
                  </div>
                </TableCell>

                {/* <TableCell className="text-center">
                  <div className="flex flex-row flex-wrap max-w-[80px] gap-1 justify-center items-center">
                    {playerCharacters.map((character) => {
                      return (
                        <Image
                          key={`${character.characterId}`}
                          alt="character"
                          height="20"
                          width="20"
                          src={`/img/characters/${
                            characterImages.get(character.characterId)?.icon
                          }`}
                        />
                      );
                    })}
                  </div>
                </TableCell> */}
                <TableCell>
                  <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                    <Image
                      alt="rank"
                      height="36"
                      width="36"
                      src={rankData.imgSrc}
                    />
                    <span className="font-bold text-center text-md md:text-lg uppercase">
                      {rankData.rankName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center pr-10">
                  {`${player.slippi_wins} / ${player.slippi_losses}`}
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
