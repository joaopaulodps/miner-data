import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const minerals = sqliteTable("minerals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  formula: text("formula").notNull(),
  habit: text("habit").notNull(),
  streak: text("streak").notNull(),
  luster: text("luster").notNull(),
  hardness: text("hardness").notNull(),
  crystalSystem: text("crystal_system").notNull(),
  cleavage: text("cleavage").notNull(),
  imageUrl: text("image_url"),
  imageSource: text("image_source"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type Mineral = typeof minerals.$inferSelect;
export type NewMineral = typeof minerals.$inferInsert;
