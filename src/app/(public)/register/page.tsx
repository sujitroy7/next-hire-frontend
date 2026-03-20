"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // <-- Import toast from sonner
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientAxios } from "@/lib/axios";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  userType: z.enum(["CANDIDATE", "ORGANIZATION"]),
});

export type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "CANDIDATE",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      const response = await clientAxios.post("/users", values);

      if (response.status === 201) {
        toast.success("Account created successfully!");
        router.push("/login" as any);
        return;
      }

      throw new Error("Registration failed");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full justify-center px-4">
      <Form {...form}>
        <form
          className="w-full max-w-sm"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card className="w-full max-w-sm h-fit mt-24">
            <CardHeader>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your details below to create your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Select Field */}
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>I am a</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CANDIDATE">Candidate</SelectItem>
                        <SelectItem value="ORGANIZATION">
                          Organization
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Register
              </Button>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href={"/login" as any}
                  className="underline hover:text-primary"
                >
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
