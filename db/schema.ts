import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  interest: text("interest").default("General Inquiry"),
  createdAt: timestamp("created_at").defaultNow(),
});
