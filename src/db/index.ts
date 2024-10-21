import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { haikusTable } from "./schema";

config({ path: ".env" });
const client = postgres(process.env.HAIKUAPI_DB_URL!);
export const db = drizzle(client);
export { haikusTable };
