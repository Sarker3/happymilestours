import type { Config, Context } from "@netlify/functions";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { adminUsers, inquiries } from "../../db/schema.js";

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;
const encoder = new TextEncoder();

const json = (body: unknown, init: ResponseInit = {}) =>
  Response.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init.headers || {}),
    },
  });

const badRequest = (detail: string) => json({ detail }, { status: 400 });

const base64Url = (input: ArrayBuffer | Uint8Array | string) => {
  const bytes =
    typeof input === "string"
      ? encoder.encode(input)
      : input instanceof Uint8Array
        ? input
        : new Uint8Array(input);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

const fromBase64Url = (input: string) => {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
};

const getSecret = () => {
  const secret = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("Missing JWT_SECRET or ADMIN_PASSWORD");
  return secret;
};

const getKey = async () =>
  crypto.subtle.importKey("raw", encoder.encode(getSecret()), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);

const timingSafeEqual = (left: string, right: string) => {
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
};

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return base64Url(digest);
};

const signToken = async (email: string) => {
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      sub: email,
      role: "admin",
      exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
    }),
  );
  const key = await getKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(`${header}.${payload}`));
  return `${header}.${payload}.${base64Url(signature)}`;
};

const verifyToken = async (token: string) => {
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return null;

  const key = await getKey();
  const ok = await crypto.subtle.verify("HMAC", key, fromBase64Url(signature), encoder.encode(`${header}.${payload}`));
  if (!ok) return null;

  const data = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as {
    sub?: string;
    role?: string;
    exp?: number;
  };
  if (!data.sub || data.role !== "admin" || !data.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
  return data.sub;
};

const ensureAdminSeed = async () => {
  const email = (process.env.ADMIN_EMAIL || "admin@happymilestours.com").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("Missing ADMIN_PASSWORD");

  const passwordHash = await sha256(`${email}:${password}`);
  const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  if (!existing.length) {
    await db.insert(adminUsers).values({ email, passwordHash, name: "Admin", role: "admin" });
  } else if (existing[0].passwordHash !== passwordHash) {
    await db.update(adminUsers).set({ passwordHash, role: "admin" }).where(eq(adminUsers.email, email));
  }
  return { email, passwordHash };
};

const requireAdmin = async (req: Request) => {
  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Bearer ")) return null;
  const email = await verifyToken(auth.slice(7));
  if (!email) return null;
  await ensureAdminSeed();
  const [user] = await db
    .select({ email: adminUsers.email, name: adminUsers.name, role: adminUsers.role })
    .from(adminUsers)
    .where(and(eq(adminUsers.email, email), eq(adminUsers.role, "admin")))
    .limit(1);
  return user || null;
};

const readJson = async (req: Request) => {
  try {
    return await req.json();
  } catch {
    return null;
  }
};

const validateInquiry = (body: any) => {
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const phone = String(body?.phone || "").trim();
  const message = String(body?.message || "").trim();
  const interest = String(body?.interest || "General Inquiry").trim() || "General Inquiry";

  if (!name || name.length > 120) return null;
  if (!email || email.length > 200 || !email.includes("@")) return null;
  if (!phone || phone.length > 30) return null;
  if (!message || message.length > 2000) return null;
  if (interest.length > 120) return null;

  return { name, email, phone, message, interest };
};

export default async (req: Request, context: Context) => {
  const path = `/${(context.params?.path || "").replace(/^\/+/, "")}`;

  try {
    if (req.method === "GET" && path === "/") {
      return json({ message: "HappyMilesTours API", status: "ok" });
    }

    if (req.method === "POST" && path === "/inquiries") {
      const inquiry = validateInquiry(await readJson(req));
      if (!inquiry) return badRequest("Invalid inquiry details");

      const [created] = await db.insert(inquiries).values(inquiry).returning();
      return json(
        {
          id: created.id,
          name: created.name,
          email: created.email,
          phone: created.phone,
          interest: created.interest,
          message: created.message,
          created_at: created.createdAt,
        },
        { status: 201 },
      );
    }

    if (req.method === "POST" && path === "/auth/login") {
      const body = await readJson(req);
      const email = String(body?.email || "").trim().toLowerCase();
      const password = String(body?.password || "");
      const admin = await ensureAdminSeed();

      if (!email || !password || email !== admin.email || !timingSafeEqual(await sha256(`${email}:${password}`), admin.passwordHash)) {
        return json({ detail: "Invalid credentials" }, { status: 401 });
      }

      return json({ token: await signToken(email), user: { email, name: "Admin", role: "admin" } });
    }

    if (path === "/auth/me") {
      const user = await requireAdmin(req);
      if (!user) return json({ detail: "Missing or invalid token" }, { status: 401 });
      return json(user);
    }

    if (path === "/admin/inquiries" || path === "/inquiries") {
      const user = await requireAdmin(req);
      if (!user) return json({ detail: "Missing or invalid token" }, { status: 401 });

      const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(1000);
      return json(
        rows.map((row) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          interest: row.interest,
          message: row.message,
          created_at: row.createdAt,
        })),
      );
    }

    if (req.method === "DELETE" && path.startsWith("/admin/inquiries/")) {
      const user = await requireAdmin(req);
      if (!user) return json({ detail: "Missing or invalid token" }, { status: 401 });

      const id = path.split("/").pop();
      if (!id) return badRequest("Missing inquiry id");
      const deleted = await db.delete(inquiries).where(eq(inquiries.id, id)).returning({ id: inquiries.id });
      if (!deleted.length) return json({ detail: "Inquiry not found" }, { status: 404 });
      return json({ ok: true });
    }

    if (req.method === "GET" && path === "/admin/stats") {
      const user = await requireAdmin(req);
      if (!user) return json({ detail: "Missing or invalid token" }, { status: 401 });

      const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const [total] = await db.select({ count: sql<number>`count(*)::int` }).from(inquiries);
      const [lastWeek] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(inquiries)
        .where(gte(inquiries.createdAt, since));

      return json({ total: total?.count || 0, last_7_days: lastWeek?.count || 0 });
    }

    return json({ detail: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("API error", error instanceof Error ? error.message : error);
    return json({ detail: "Server error" }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/:path*",
};
