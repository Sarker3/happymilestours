import type { Config } from "@netlify/functions";
import { SignJWT } from "jose";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ detail: "Invalid JSON" }, { status: 400 });
  }

  const { email = "", password = "" } = body;
  const adminEmail = (Netlify.env.get("ADMIN_EMAIL") ?? "admin@happymilestours.com").trim().toLowerCase();
  const adminPassword = Netlify.env.get("ADMIN_PASSWORD");
  const jwtSecret = Netlify.env.get("JWT_SECRET") ?? "dev-secret-change-in-production";

  if (!adminPassword) {
    return Response.json({ detail: "Server misconfigured" }, { status: 500 });
  }

  if (email.trim().toLowerCase() !== adminEmail || password !== adminPassword) {
    return Response.json({ detail: "Invalid credentials" }, { status: 401 });
  }

  const secret = new TextEncoder().encode(jwtSecret);
  const token = await new SignJWT({ sub: email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  return Response.json({ token, user: { email, name: "Admin", role: "admin" } });
};

export const config: Config = {
  path: "/api/auth/login",
};
