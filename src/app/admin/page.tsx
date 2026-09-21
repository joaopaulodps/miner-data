import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { minerals } from "@/lib/schema";
import DeleteButton from "@/components/DeleteButton";
import SignOutButton from "@/components/SignOutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const allMinerals = await db.select().from(minerals);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Painel Admin</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/novo"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Novo Mineral
          </Link>
        </div>
      </div>

      {allMinerals.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>Nenhum mineral cadastrado.</p>
          <Link href="/admin/novo" className="text-primary hover:underline mt-2 inline-block">
            Criar primeiro mineral
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Foto
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Nome
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">
                    Fórmula
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">
                    Dureza
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allMinerals.map((mineral) => (
                  <tr key={mineral.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 relative bg-gray-100 rounded-lg overflow-hidden">
                        {mineral.imageUrl ? (
                          <Image
                            src={mineral.imageUrl}
                            alt={mineral.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">
                            {mineral.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{mineral.name}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono hidden sm:table-cell">
                      {mineral.formula}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                      {mineral.hardness}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/mineral/${mineral.slug}`}
                          className="text-gray-400 hover:text-primary transition-colors p-1"
                          title="Ver"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/editar/${mineral.id}`}
                          className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                          title="Editar"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>
                        <DeleteButton mineralId={mineral.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
