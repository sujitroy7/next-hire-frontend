import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  about: string;
}

export default function AboutUs({ about }: Props) {
  return (
    <div className="md:col-span-2 space-y-6">
      <Card className="shadow-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">About Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {about}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
