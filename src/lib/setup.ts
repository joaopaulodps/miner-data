import "dotenv/config";
import { createClient } from "@libsql/client";

async function setup() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  console.log("Creating table on Turso...");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS minerals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      formula TEXT NOT NULL,
      habit TEXT NOT NULL,
      streak TEXT NOT NULL,
      luster TEXT NOT NULL,
      hardness TEXT NOT NULL,
      crystal_system TEXT NOT NULL,
      cleavage TEXT NOT NULL,
      image_url TEXT,
      image_source TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  console.log("Table created successfully on Turso!");
}

setup().catch(console.error);
