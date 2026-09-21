import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MineralForm from "@/components/MineralForm";

export default async function NewMineralPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Novo Mineral</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <MineralForm mode="create" />
      </div>
    </div>
  );
}
