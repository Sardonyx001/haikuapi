import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const haikus = pgTable("haikus", {
  id: uuid("id").defaultRandom().primaryKey(),
  first: text("first").notNull(),
  mid: text("mid").notNull(),
  last: text("last").notNull(),
  source: text("source").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
