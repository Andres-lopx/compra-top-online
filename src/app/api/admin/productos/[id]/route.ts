import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { NextResponse } from "next/server"

async function verificarAdmin() {
  const session = await auth()
  return session?.user?.role === "ADMIN"
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await verificarAdmin()) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const producto = await prisma.producto.update({ where: { id }, data: body })
  return NextResponse.json(producto)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await verificarAdmin()) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { id } = await params
  await prisma.producto.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
