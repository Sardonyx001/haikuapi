import { Elysia } from "elysia";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env" });
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

const app = new Elysia()
  .get("/", () => "Hi")
  .get("/rand", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
