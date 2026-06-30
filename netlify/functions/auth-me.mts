import type { Config } from "@netlify/functions";
import { jwtVerify } from "jose";

async function verifyAdmin(req: Request): Promise<string | null> {
  const auth = req.headers.get("Authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  const jwtSecret = Netlify.env.get("JWT_SECRET") ?? "dev-secret-change-in-production";
  const secret = new TextEncoder().encode(jwtSecret);
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") return null;
    return payload.sub as string;
  } catch {
    return null;
  }
}

export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  const email = await verifyAdmin(req);
  if (!email) {
    return Response.json({ detail: "Unauthorized" }, { status: 401 });
  }
  return Response.json({ email, name: "Admin", role: "admin" });
};

export const config: Config = {
  path: "/api/auth/me",
};
