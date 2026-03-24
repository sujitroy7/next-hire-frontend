import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CandidatesTableSkeleton() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="h-12 font-semibold pl-6">Candidate</TableHead>
            <TableHead className="h-12 font-semibold">Email</TableHead>
            <TableHead className="h-12 font-semibold">Applied For</TableHead>
            <TableHead className="h-12 font-semibold">Status</TableHead>
            <TableHead className="h-12 font-semibold">Applied Date</TableHead>
            <TableHead className="h-12 font-semibold pr-6 text-right">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="py-4 pl-6">
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                <div className="h-3 w-24 bg-muted animate-pulse rounded mt-1.5" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-4 w-36 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-4 w-28 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-5 w-20 bg-muted animate-pulse rounded-full" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell className="py-4 pr-6 text-right">
                <div className="h-8 w-8 bg-muted animate-pulse rounded ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
