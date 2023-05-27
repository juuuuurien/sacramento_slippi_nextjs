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
import { fetchSiteData } from "@/services/app";
import { fetchPlayerData } from "@/services/players";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

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
        {/* {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

async function wait() {
  return new Promise((resolve) => setTimeout(resolve, 5000));
}

async function PlayerTable() {
  dayjs.extend(advancedFormat);

  // const playerDataPromise = fetchPlayerData();
  // const siteDataPromise = fetchSiteData();

  // const [playerData, siteData] = await Promise.all([
  //   playerDataPromise,
  //   siteDataPromise,
  //   wait(),
  // ]);

  // console.log(playerData.data);
  const headerData: HeaderData[] = [
    { title: "Rank" },
    { title: "Player" },
    { title: "Characters" },
    { title: "Rating" },
    { title: "W/L", style: "text-right" },
  ];

  return (
    <Table className="bg-slate-900">
      <TableCaption>{dayjs().format("MMMM Do, YYYY")}</TableCaption>
      <TableHeader>
        <TableRow>
          {headerData.map((header) => (
            <TableHead className={` ${header.style}`} key={header.title}>
              {header.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {/* <TableBody>
        {playerData?.data.map((player: PlayerData) => (
          <TableRow key={player.connect_code}>
            <TableCell className="font-medium">{player.rank}</TableCell>
            <TableCell>{player.player_tag}</TableCell>
            <TableCell>{player.rank}</TableCell>
            <TableCell>{player.slippi_rating}</TableCell>
            <TableCell className="text-right">{player.rank}</TableCell>
          </TableRow>
        ))}
      </TableBody> */}
    </Table>
  );
}

export default PlayerTable;
