import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Plus } from "lucide-react";
import AddRecruiterButtonWrapper from "./add-recruiter-dialog-wrapper";

export default function EmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted mb-4">
          <Users className="size-6 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight mb-1">
          No recruiters yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          Recruiters help you find the best talent. Add your first recruiter to
          get started.
        </p>
        <AddRecruiterButtonWrapper>
          <Button>
            <Plus />
            Add Your First Recruiter
          </Button>
        </AddRecruiterButtonWrapper>
      </CardContent>
    </Card>
  );
}
