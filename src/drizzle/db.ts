import { env } from "@/data/env/server"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "@/drizzle/schema"

const connector = neon(env.DATABASE_URL)
export const db = drizzle(connector, { schema })
