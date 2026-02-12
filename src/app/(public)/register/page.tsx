"use client";

import Link from "next/link";
import { useFormik } from "formik";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientAxios } from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userType: "CANDIDATE",
    },
    onSubmit: async (values) => {
      try {
        const response = await clientAxios.post("/users", values);
        console.log(response, "test-log");

        if (response.status === 201) {
          toast.success("Account created successfully!");
          router.push("/login");
          return;
        }

        throw new Error("Registration failed");
      } catch (error) {
        console.error("Error registering:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="flex h-screen w-full justify-center px-4">
      <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
        <Card className="w-full max-w-sm h-fit mt-24">
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>

            {/* Select Field */}
            <div className="grid gap-2">
              <Label htmlFor="userType">I am a</Label>
              <Select
                name="userType"
                defaultValue={formik.values.userType}
                onValueChange={(value) =>
                  formik.setFieldValue("userType", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CANDIDATE">Candidate</SelectItem>
                  <SelectItem value="ORGANIZATION">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" type="submit">
              Register
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="underline hover:text-primary">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
