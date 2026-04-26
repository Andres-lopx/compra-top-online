import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { id } = await params
  await prisma.categoria.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
