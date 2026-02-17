import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  images: string[];
}

export default function OrgGallery({ images }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-xl">Company Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-video w-full overflow-hidden rounded-md border border-border/50"
            >
              {/* TODO: Use Next.js Image component */}
              {/* <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              /> */}
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                // fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
