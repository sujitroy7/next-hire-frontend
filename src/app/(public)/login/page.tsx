"use client";

import Link from "next/link";
import { useFormik } from "formik";
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
import { Label } from "@/components/ui/label";
import { login } from "@/store/thunks/authThunk";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { AccessTokenPayload, UserRole } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

const redirectionPages: Record<UserRole, string> = {
  ORGANIZATION: "/org/dashboard",
  RECRUITER: "/recruiter/dashboard",
  CANDIDATE: "/candidate/dashboard",
};
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "organization1@gmail.com",
      password: "organization",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(login(values))
        .unwrap()
        .then((token) => {
          const decoded = jwtDecode<AccessTokenPayload>(token);
          const redirectionPath = redirectionPages[decoded.userType];
          router.push(redirectionPath);
        });
    },
  });

  return (
    <div className="flex h-screen w-full justify-center px-4">
      <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
        <Card className="w-full max-w-sm h-fit mt-24">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="text-sm text-muted-foreground">
              Don&apos;t have an account?
              <Link href="/register" className="underline hover:text-primary">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
