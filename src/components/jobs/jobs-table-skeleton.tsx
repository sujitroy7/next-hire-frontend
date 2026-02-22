import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function JobsTableSkeleton() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="h-12 font-semibold first:pl-6 last:pr-6 last:text-right">
              Job Title
            </TableHead>
            <TableHead className="h-12 font-semibold first:pl-6 last:pr-6 last:text-right">
              Department
            </TableHead>
            <TableHead className="h-12 font-semibold first:pl-6 last:pr-6 last:text-right">
              Type
            </TableHead>
            <TableHead className="h-12 font-semibold first:pl-6 last:pr-6 last:text-right">
              Status
            </TableHead>
            <TableHead className="h-12 font-semibold first:pl-6 last:pr-6 last:text-right">
              Posted Date
            </TableHead>
            <TableHead className="h-12 font-semibold first:pl-6 last:pr-6 last:text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="py-4 first:pl-6 last:pr-6 last:text-right">
                <Skeleton className="h-5 w-48" />
              </TableCell>
              <TableCell className="py-4 first:pl-6 last:pr-6 last:text-right">
                <Skeleton className="h-5 w-24" />
              </TableCell>
              <TableCell className="py-4 first:pl-6 last:pr-6 last:text-right">
                <Skeleton className="h-5 w-20 rounded-full" />
              </TableCell>
              <TableCell className="py-4 first:pl-6 last:pr-6 last:text-right">
                <Skeleton className="h-5 w-20 rounded-full" />
              </TableCell>
              <TableCell className="py-4 first:pl-6 last:pr-6 last:text-right">
                <Skeleton className="h-5 w-28" />
              </TableCell>
              <TableCell className="py-4 first:pl-6 last:pr-6 last:text-right">
                <div className="flex justify-end pr-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
