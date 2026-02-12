"use client";

import * as React from "react";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="flex flex-col items-center space-y-4 pb-2 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
            <CardDescription className="text-balance text-muted-foreground">
              Sorry, your current account permissions do not allow access to
              this page. If you believe this is an error, please contact
              support.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent />
        <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button className="w-full sm:w-auto" onClick={() => router.push("/")}>
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
