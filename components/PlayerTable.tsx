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
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

type TableProps = {
  headerData: HeaderData[];
  playerData: PlayerData[];
};

const PlayerTable = ({ headerData, playerData }: TableProps) => {
  dayjs.extend(advancedFormat);

  return (
    <Table>
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

export default PlayerTable;
