import type { Config } from "@netlify/functions";
import { jwtVerify } from "jose";
import { db } from "../../db/index.js";
import { inquiries } from "../../db/schema.js";
import { count, gte } from "drizzle-orm";

async function verifyAdmin(req: Request): Promise<boolean> {
  const auth = req.headers.get("Authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return false;
  const token = auth.slice(7);
  const jwtSecret = Netlify.env.get("JWT_SECRET") ?? "dev-secret-change-in-production";
  const secret = new TextEncoder().encode(jwtSecret);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) {
    return Response.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [totalRow] = await db.select({ value: count() }).from(inquiries);
  const [lastWeekRow] = await db
    .select({ value: count() })
    .from(inquiries)
    .where(gte(inquiries.createdAt, sevenDaysAgo));

  return Response.json({
    total: totalRow.value,
    last_7_days: lastWeekRow.value,
  });
};

export const config: Config = {
  path: "/api/admin/stats",
};
