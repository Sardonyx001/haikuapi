import { Elysia } from "elysia";
import { db, haikusTable } from "@/src/db";
import { sql } from "drizzle-orm";
import { Logestic } from "logestic";

const app = new Elysia()
  .use(Logestic.preset("fancy"))
  .onBeforeHandle(({ set }) => {
    set.headers["x-powered-by"] = "Elysia";
  })
  .get("/_health", () => ({
    status: "healthy",
    uptime: process.uptime(),
  }))
  .get("/", ({ set }) => {
    set.status = "Not Implemented"; // 501
    return {
      message: "Available endpoints: /random, /_health",
      error: "Not Implemented",
    };
  })
  .get("/random", async () => {
    const result = await db
      .select()
      .from(haikusTable)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    const haiku = result[0];
    return {
      id: haiku.id,
      haiku: [haiku.first, haiku.mid, haiku.last],
      source: haiku.source,
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
