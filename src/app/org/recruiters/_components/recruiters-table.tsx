import { Recruiter } from "@/types/recruiter";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, getInitials } from "@/lib/utils";
import DeleteRecruiterButton from "./delete-recruiter-button";

interface RecruitersTableProps {
  data: Recruiter[];
}

export function RecruitersTable({ data }: RecruitersTableProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="h-12 font-semibold pl-6">Recruiter</TableHead>
            <TableHead className="h-12 font-semibold">Status</TableHead>
            <TableHead className="h-12 font-semibold">Joined</TableHead>
            <TableHead className="h-12 font-semibold pr-6 text-right">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length ? (
            data.map((recruiter) => (
              <TableRow
                key={recruiter.id}
                className="transition-colors hover:bg-muted/50"
              >
                <TableCell className="py-4 pl-6">
                  <div className="flex items-center gap-4 min-w-0">
                    <Avatar size="lg">
                      <AvatarFallback>
                        {getInitials(recruiter.firstName, recruiter.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-none truncate text-primary">
                        {recruiter.firstName} {recruiter.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {recruiter.user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge variant={recruiter.isActive ? "secondary" : "outline"}>
                    {recruiter.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  {formatDate(recruiter.user.createdAt)}
                </TableCell>
                <TableCell className="py-4 pr-6 text-right">
                  <DeleteRecruiterButton userId={recruiter.userId} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-32 text-center text-muted-foreground"
              >
                No recruiters found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
