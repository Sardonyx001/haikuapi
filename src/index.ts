import { Elysia } from "elysia";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { haikusTable } from "./db/schema";
import { sql } from "drizzle-orm";

config({ path: ".env" });
const client = postgres(process.env.HAIKUAPI_DB_URL!);
export const db = drizzle(client);

const app = new Elysia()
  .get("/", () => "Hi")
  .get("/rand", () =>
    db
      .select()
      .from(haikusTable)
      .orderBy(sql`RANDOM()`)
      .limit(1),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
