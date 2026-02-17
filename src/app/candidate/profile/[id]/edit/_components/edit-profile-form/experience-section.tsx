import { Control, useFieldArray, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { ProfileFormValues } from "./schema";

interface ExperienceSectionProps {
  control: Control<ProfileFormValues>;
}

export function ExperienceSection({ control }: ExperienceSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const { watch } = useFormContext<ProfileFormValues>();

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle>Work Experience</CardTitle>
          </div>
          <CardDescription>Add your relevant work history.</CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              jobTitle: "",
              companyName: "",
              startDate: "",
              isCurrent: false,
              location: "",
              description: "",
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Position
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:border-primary/20"
          >
            <div className="absolute right-4 top-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => remove(index)}
                aria-label="Remove experience"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={control}
                name={`experiences.${index}.jobTitle`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Job Title <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Senior Software Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`experiences.${index}.companyName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Acme Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`experiences.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Start Date <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`experiences.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value || ""}
                        disabled={watch(`experiences.${index}.isCurrent`)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2">
                <FormField
                  control={control}
                  name={`experiences.${index}.location`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Remote, NY"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <FormField
                  control={control}
                  name={`experiences.${index}.isCurrent`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        I currently work here
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <FormField
                  control={control}
                  name={`experiences.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your responsibilities and achievements..."
                          className="min-h-[100px]"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        ))}
        {fields.length === 0 && (
          <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed text-center text-muted-foreground">
            <p>No experience added yet.</p>
            <Button
              type="button"
              variant="link"
              onClick={() =>
                append({
                  jobTitle: "",
                  companyName: "",
                  startDate: "",
                  isCurrent: false,
                  location: "",
                  description: "",
                })
              }
            >
              Add your first position
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
