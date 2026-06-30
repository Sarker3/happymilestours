import type { Config, Context } from "@netlify/functions";
import { jwtVerify } from "jose";
import { db } from "../../db/index.js";
import { inquiries } from "../../db/schema.js";
import { eq, desc } from "drizzle-orm";

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

export default async (req: Request, context: Context) => {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) {
    return Response.json({ detail: "Unauthorized" }, { status: 401 });
  }

  if (req.method === "GET") {
    const items = await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt));
    return Response.json(items);
  }

  if (req.method === "DELETE") {
    const id = context.params.id;
    if (!id) {
      return Response.json({ detail: "Missing inquiry id" }, { status: 400 });
    }
    const deleted = await db
      .delete(inquiries)
      .where(eq(inquiries.id, id))
      .returning();
    if (deleted.length === 0) {
      return Response.json({ detail: "Inquiry not found" }, { status: 404 });
    }
    return Response.json({ ok: true });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/admin/inquiries", "/api/admin/inquiries/:id"],
};
