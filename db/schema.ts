import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  interest: text("interest").notNull().default("General Inquiry"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  email: text("email").primaryKey(),
  name: text("name").notNull().default("Admin"),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
