import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  id: string;
}

export default function EditProfile({ id }: Props) {
  return (
    <div className="flex justify-end pt-4 pr-4">
      <Link href={`${id}/edit`}>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </Link>
    </div>
  );
}
