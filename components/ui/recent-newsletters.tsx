import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentNewsletters = [
  {
    id: "1",
    title: "May Update",
    sentDate: "2023-05-15",
    openRate: "24.3%",
    clickRate: "6.2%",
  },
  {
    id: "2",
    title: "April Newsletter",
    sentDate: "2023-04-01",
    openRate: "22.8%",
    clickRate: "5.9%",
  },
  {
    id: "3",
    title: "March Digest",
    sentDate: "2023-03-15",
    openRate: "25.1%",
    clickRate: "7.0%",
  },
  {
    id: "4",
    title: "February Roundup",
    sentDate: "2023-02-28",
    openRate: "23.5%",
    clickRate: "6.5%",
  },
];

export function RecentNewsletters() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Sent Date</TableHead>
          <TableHead>Open Rate</TableHead>
          <TableHead>Click Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentNewsletters.map((newsletter) => (
          <TableRow key={newsletter.id}>
            <TableCell className="font-medium">{newsletter.title}</TableCell>
            <TableCell>{newsletter.sentDate}</TableCell>
            <TableCell>{newsletter.openRate}</TableCell>
            <TableCell>{newsletter.clickRate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
