import { db } from "@/lib/db";
import { minerals } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import InfoRow from "@/components/InfoRow";

export const dynamic = "force-dynamic";

export default async function MineralDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [mineral] = await db
    .select()
    .from(minerals)
    .where(eq(minerals.slug, slug));

  if (!mineral) notFound();

  const infoRows = [
    {
      label: "Fórmula Química",
      value: mineral.formula,
      tip: "Representação simbólica dos elementos químicos que compõem o mineral e suas proporções.",
    },
    {
      label: "Hábito",
      value: mineral.habit,
      tip: "Forma externa e aspecto geral dos cristais de um mineral (massivo, prismático, lamelar, etc.).",
    },
    {
      label: "Traço",
      value: mineral.streak,
      tip: "Cor do pó do mineral ao ser riscado sobre uma placa de porcelana não glazeada.",
    },
    {
      label: "Brilho",
      value: mineral.luster,
      tip: "Como a superfície do mineral reflete a luz (vítreo, metálico, adamantino, etc.).",
    },
    {
      label: "Dureza (Mohs)",
      value: mineral.hardness,
      tip: "Grau de resistência do mineral à penetração, numa escala de 1 (talco) a 10 (diamante).",
    },
    {
      label: "Sistema Cristalino",
      value: mineral.crystalSystem,
      tip: "Classificação geométrica baseada na disposição dos átomos na estrutura cristalina (cúbico, hexagonal, etc.).",
    },
    {
      label: "Clivagem",
      value: mineral.cleavage,
      tip: "Tendência do mineral de quebrar-se ao longo de planos definidos de menor resistência.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Voltar ao catálogo
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image */}
        <div className="relative aspect-video bg-gray-100">
          <Image
            src={mineral.imageUrl || "/logo.png"}
            alt={mineral.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
            loading="eager"
            priority
          />
        </div>

        {/* Image source - below the image */}
        {mineral.imageSource && (
          <p className="px-6 md:px-8 pt-3 text-xs text-gray-400">
            Fonte da imagem: {mineral.imageSource}
          </p>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-2">{mineral.name}</h1>
          <p className="text-lg text-primary font-mono mb-6">
            {mineral.formula}
          </p>

          <div className="space-y-4">
            {infoRows.map((row) => (
              <InfoRow key={row.label} {...row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
