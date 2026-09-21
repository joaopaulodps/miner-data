import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { minerals } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { toSlug } from "@/lib/slug";

export async function GET() {
  const allMinerals = await db.select().from(minerals);
  return NextResponse.json(allMinerals);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.name || !body.formula) {
    return NextResponse.json(
      { error: "Nome e fórmula são obrigatórios." },
      { status: 400 }
    );
  }

  const slug = toSlug(body.name);

  const [created] = await db
    .insert(minerals)
    .values({
      name: body.name,
      slug,
      formula: body.formula,
      habit: body.habit || "",
      streak: body.streak || "",
      luster: body.luster || "",
      hardness: body.hardness || "",
      crystalSystem: body.crystalSystem || "",
      cleavage: body.cleavage || "",
      imageUrl: body.imageUrl || null,
      imageSource: body.imageSource || null,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
