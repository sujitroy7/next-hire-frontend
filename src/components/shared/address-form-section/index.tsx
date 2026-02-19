import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Control, FieldValues, FieldPath } from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name?: FieldPath<T>; // optional, defaults to "address"
}

export default function AddressFormSection<T extends FieldValues>({
  control,
  name = "address" as FieldPath<T>,
}: Props<T>) {
  const field = (key: string) => `${name}.${key}` as FieldPath<T>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription>Where is your organization located?</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={control}
          name={field("streetLine1")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Line 1</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={field("streetLine2")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Line 2 (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Suite 100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={control}
            name={field("city")}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={field("state")}
            render={({ field }) => (
              <FormItem>
                <FormLabel>State / Province</FormLabel>
                <FormControl>
                  <Input placeholder="CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={control}
            name={field("postalCode")}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip / Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="94105" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={field("country")}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="United States" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
