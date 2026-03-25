"use server";

export async function submitEarlyAccess(data: FormData) {
  const email = data.get("email");

  if (!email || typeof email !== "string") {
    return { success: false, error: "Invalid email" };
  }

  // Simulate server thinking/saving
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Here we would normally add to db or newsletter list

  return { success: true, message: "Thanks for joining!" };
}
