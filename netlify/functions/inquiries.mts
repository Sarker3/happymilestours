import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { inquiries } from "../../db/schema.js";
import { randomUUID } from "crypto";

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ detail: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, phone, message, interest = "General Inquiry" } = body;
  if (!name || !email || !phone || !message) {
    return Response.json({ detail: "Missing required fields" }, { status: 400 });
  }

  const [inquiry] = await db
    .insert(inquiries)
    .values({ id: randomUUID(), name, email, phone, message, interest })
    .returning();

  return Response.json(inquiry, { status: 201 });
};

export const config: Config = {
  path: "/api/inquiries",
};
