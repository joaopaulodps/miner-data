import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { minerals } from "@/lib/schema";
import { eq } from "drizzle-orm";
import MineralForm from "@/components/MineralForm";

export const dynamic = "force-dynamic";

export default async function EditMineralPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;
  const [mineral] = await db
    .select()
    .from(minerals)
    .where(eq(minerals.id, Number(id)));

  if (!mineral) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Editar Mineral</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <MineralForm mineral={mineral} mode="edit" />
      </div>
    </div>
  );
}
