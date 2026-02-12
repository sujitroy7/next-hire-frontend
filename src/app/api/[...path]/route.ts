import { envRequired } from "@/lib/envRequired";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = envRequired("BACKEND_URL");

/**
 * Next.js API Route Proxy
 * Forwards all requests to the backend and passes cookies
 * This ensures same-origin requests, allowing SameSite=strict cookies to work
 */
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> },
) {
  const params = await props.params;
  return handleRequest(request, params, "GET");
}

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> },
) {
  const params = await props.params;
  return handleRequest(request, params, "POST");
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> },
) {
  const params = await props.params;
  return handleRequest(request, params, "PATCH");
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> },
) {
  const params = await props.params;
  return handleRequest(request, params, "DELETE");
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string,
) {
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/${path}`;

  // Get cookies from the request
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  // Get request body for POST/PATCH requests
  let body = null;
  if (method === "POST" || method === "PATCH") {
    try {
      body = await request.json();
    } catch {
      // No body or invalid JSON
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    // Forward Set-Cookie headers from backend to client
    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });

    // Copy Set-Cookie headers from backend response
    const setCookieHeaders = response.headers.get("set-cookie");
    if (setCookieHeaders) {
      nextResponse.headers.set("Set-Cookie", setCookieHeaders);
    }

    return nextResponse;
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend" },
      { status: 500 },
    );
  }
}
