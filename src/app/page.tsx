import { db } from "@/lib/db";
import { minerals } from "@/lib/schema";
import MineralList from "@/components/MineralList";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const allMinerals = await db.select().from(minerals);

  return <MineralList minerals={allMinerals} />;
}
