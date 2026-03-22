"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { login } from "@/store/thunks/authThunk";
import { userApi } from "@/store/services/userApi";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { redirectionPages } from "@/constants/redirects";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [reload] = useQueryState("reload");

  const dispatch = useAppDispatch();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (reload == "true") {
      router.replace("/login");
      router.refresh(); // wipe states by refreshing the page
    }
  }, [reload]);

  const onSubmit = async (values: FormData) => {
    try {
      await dispatch(login(values)).unwrap();
      const response = await dispatch(
        userApi.endpoints.getMe.initiate(),
      ).unwrap();
      const redirectionPath = redirectionPages[response.data.userType];
      router.replace(redirectionPath as any);
    } catch (error) {
      console.error("Login failed:", error);
      // handle error
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
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
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
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href={"/register" as any}
                  className="underline hover:text-primary"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
