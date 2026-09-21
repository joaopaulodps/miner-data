import { createClient } from "@libsql/client";

async function setup() {
  const client = createClient({
    url: "file:local.db",
  });

  await client.execute(`DROP TABLE IF EXISTS minerals`);

  await client.execute(`
    CREATE TABLE minerals (
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

  console.log("Table recreated successfully!");
}

setup().catch(console.error);
