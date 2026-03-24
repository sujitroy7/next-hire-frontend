import { OrganizationCandidate } from "@/types/candidate";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CandidatesTableProps {
  data: OrganizationCandidate[];
  renderActions?: (candidate: OrganizationCandidate) => React.ReactNode;
}

const statusVariantMap: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  APPLIED: "secondary",
  REVIEWING: "outline",
  SHORTLISTED: "default",
  REJECTED: "destructive",
  HIRED: "default",
};

export function CandidatesTable({ data, renderActions }: CandidatesTableProps) {
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
          {data?.length ? (
            data.map((application) => (
              <TableRow
                key={application.id}
                className="transition-colors hover:bg-muted/50"
              >
                <TableCell className="py-4 pl-6">
                  <div className="font-medium text-primary">
                    {application.candidate.firstName}{" "}
                    {application.candidate.lastName}
                  </div>
                  {application.candidate.headline && (
                    <div className="text-sm text-muted-foreground mt-0.5 truncate max-w-[200px]">
                      {application.candidate.headline}
                    </div>
                  )}
                </TableCell>
                <TableCell className="py-4 text-muted-foreground">
                  {application.candidate.publicEmail || "-"}
                </TableCell>
                <TableCell className="py-4">
                  <span className="font-medium">{application.job.title}</span>
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant={
                      statusVariantMap[application.status] || "secondary"
                    }
                    className="capitalize"
                  >
                    {application.status.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(application.appliedAt))}
                </TableCell>
                <TableCell className="py-4 pr-6 text-right">
                  {renderActions ? renderActions(application) : null}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                No candidates found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
