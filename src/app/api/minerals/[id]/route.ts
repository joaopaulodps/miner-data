import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { minerals } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { toSlug } from "@/lib/slug";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [mineral] = await db
    .select()
    .from(minerals)
    .where(eq(minerals.id, Number(id)));

  if (!mineral) {
    return NextResponse.json({ error: "Mineral not found" }, { status: 404 });
  }

  return NextResponse.json(mineral);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, string | null> = {
    name: body.name,
    slug: toSlug(body.name),
    formula: body.formula,
    habit: body.habit,
    streak: body.streak,
    luster: body.luster,
    hardness: body.hardness,
    crystalSystem: body.crystalSystem,
    cleavage: body.cleavage,
    imageUrl: body.imageUrl || null,
    imageSource: body.imageSource || null,
  };

  const [updated] = await db
    .update(minerals)
    .set(updateData)
    .where(eq(minerals.id, Number(id)))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Mineral not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const [deleted] = await db
    .delete(minerals)
    .where(eq(minerals.id, Number(id)))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Mineral not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
