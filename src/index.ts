import { Elysia } from "elysia";
import { haikusTable } from "@/src/db/schema";
import { sql } from "drizzle-orm";
import { db } from "@/src/db";

const app = new Elysia()
  .get("/", () => "Hi")
  .get("/rand", async () => {
    const result = await db
      .select()
      .from(haikusTable)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    const haiku = result[0];
    return {
      haiku: `${haiku.first}\n${haiku.mid}\n${haiku.last}`,
      source: haiku.source,
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
