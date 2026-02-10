import { UserType } from "@/types/auth";
import { jwtVerify } from "jose";

export async function verifyPermissions(token: string) {
  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_PERMISSIONS_SECRET,
    );
    const { payload } = await jwtVerify(token, secret);

    return payload as {
      sub: string;
      role: UserType;
    } | null;
  } catch (error) {
    return null; // Invalid signature or expired
  }
}
