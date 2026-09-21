import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { minerals } from "./schema";
import { toSlug } from "./slug";

const client = createClient({
  url: "file:local.db",
});

const db = drizzle(client);

const seedMinerals = [
  {
    name: "Andaluzita",
    formula: "Al₂SiO₅",
    habit: "Prismático, massivo",
    streak: "Branco",
    luster: "Vítreo",
    hardness: "6.5 - 7.5",
    crystalSystem: "Ortorrômbico",
    cleavage: "Bom em direção, distinto em outra",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Andalusite.jpg/640px-Andalusite.jpg",
    imageSource: "Wikimedia Commons",
  },
  {
    name: "Aragonita",
    formula: "CaCO₃",
    habit: "Pseudohexagonal, agulhas, estrelado",
    streak: "Branco",
    luster: "Vítreo",
    hardness: "3.5 - 4",
    crystalSystem: "Ortorrômbico",
    cleavage: "Indistinto",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Aragonite-119687.jpg/640px-Aragonite-119687.jpg",
    imageSource: "Wikimedia Commons",
  },
  {
    name: "Azurita",
    formula: "Cu₃(CO₃)₂(OH)₂",
    habit: "Massiva, cristalina, terrosa",
    streak: "Azul-azulado",
    luster: "Vítreo a opaco",
    hardness: "3.5 - 4",
    crystalSystem: "Monoclínico",
    cleavage: "Imperfeito",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Azurite-138793.jpg/640px-Azurite-138793.jpg",
    imageSource: "Wikimedia Commons",
  },
  {
    name: "Barita",
    formula: "BaSO₄",
    habit: "Tabular, prismático, lamelar",
    streak: "Branco",
    luster: "Vítreo a resinoso",
    hardness: "3 - 3.5",
    crystalSystem: "Ortorrômbico",
    cleavage: "Perfeito em três direções",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Barite-171244.jpg/640px-Barite-171244.jpg",
    imageSource: "Wikimedia Commons",
  },
  {
    name: "Calcita",
    formula: "CaCO₃",
    habit: "Rômboédrico, escalar, piramidal",
    streak: "Branco",
    luster: "Vítreo",
    hardness: "3",
    crystalSystem: "Trigonal",
    cleavage: "Perfeito em três direções (romboédrica)",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Calcite-fluorite-pyrite-29476.jpg/640px-Calcite-fluorite-pyrite-29476.jpg",
    imageSource: "Wikimedia Commons",
  },
  {
    name: "Calcopirita",
    formula: "CuFeS₂",
    habit: "Tetragonal, massiva",
    streak: "Verde-escuro a preto",
    luster: "Metálico",
    hardness: "3.5 - 4",
    crystalSystem: "Tetragonal",
    cleavage: "Indistinto em direção",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chalcopyrite-CuFeS2-Schmidt.jpg/640px-Chalcopyrite-CuFeS2-Schmidt.jpg",
    imageSource: "Wikimedia Commons",
  },
  {
    name: "Cassiterita",
    formula: "SnO₂",
    habit: "Bipiramidal, prismático, massivo",
    streak: "Marrom-amarelado",
    luster: "Adamantino a vítreo",
    hardness: "6 - 7",
    crystalSystem: "Tetragonal",
    cleavage: "Indistinto",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Cassiterite_on_gangue2.jpg/640px-Cassiterite_on_gangue2.jpg",
    imageSource: "Wikimedia Commons",
  },
  {
    name: "Cromita",
    formula: "FeCr₂O₄",
    habit: "Octaédrico, massivo",
    streak: "Marrom-escuro",
    luster: "Metálico a submetálico",
    hardness: "5.5",
    crystalSystem: "Cúbico",
    cleavage: "Indistinto",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Chromite-145505.jpg/640px-Chromite-145505.jpg",
    imageSource: "Wikimedia Commons",
  },
];

async function seed() {
  console.log("Seeding database...");
  await db.delete(minerals);
  await db.insert(minerals).values(
    seedMinerals.map((m) => ({
      ...m,
      slug: toSlug(m.name),
    }))
  );
  console.log(`Seeded ${seedMinerals.length} minerals.`);
}

seed().catch(console.error);
