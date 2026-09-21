"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import type { Mineral } from "@/lib/schema";

const fields = [
  { name: "name", label: "Nome", required: true },
  { name: "formula", label: "Fórmula Química", required: true },
  { name: "habit", label: "Hábito", required: true },
  { name: "streak", label: "Traço", required: true },
  { name: "luster", label: "Brilho", required: true },
  { name: "hardness", label: "Dureza (Mohs)", required: true },
  { name: "crystalSystem", label: "Sistema Cristalino", required: true },
  { name: "cleavage", label: "Clivagem", required: true },
  { name: "imageSource", label: "Fonte da Imagem", required: false },
];

export default function MineralForm({
  mineral,
  mode,
}: {
  mineral?: Mineral;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(mineral?.imageUrl || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      } else {
        alert(`Erro: ${data.error || "Erro desconhecido"}\n${data.details || ""}`);
      }
    } catch (err) {
      alert(`Erro de conexão: ${err}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    for (const field of fields) {
      data[field.name] = formData.get(field.name) as string;
    }
    data.imageUrl = imageUrl;

    try {
      const url =
        mode === "create" ? "/api/minerals" : `/api/minerals/${mineral?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Erro ao salvar mineral.");
      }
    } catch {
      setError("Erro ao salvar mineral.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Foto do Mineral
        </label>
        <div className="flex items-start gap-4">
          <div className="w-32 h-32 relative bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 shrink-0">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="object-cover"
                sizes="128px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">
                ?
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="block">
              <span className="sr-only">Escolher imagem</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer"
              />
            </label>
            {uploading && (
              <p className="text-sm text-gray-500 mt-2">Enviando imagem...</p>
            )}
            <input type="hidden" name="imageUrl" value={imageUrl} />
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div
            key={field.name}
            className={
              field.name === "cleavage" || field.name === "imageSource"
                ? "md:col-span-2"
                : ""
            }
          >
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              id={field.name}
              name={field.name}
              type="text"
              required={field.required}
              defaultValue={
                mineral
                  ? String(mineral[field.name as keyof Mineral] || "")
                  : ""
              }
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading || uploading}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading
            ? "Salvando..."
            : mode === "create"
            ? "Criar Mineral"
            : "Salvar Alterações"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
