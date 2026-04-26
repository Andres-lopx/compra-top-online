import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { nombre, slug } = await req.json()
  const categoria = await prisma.categoria.create({ data: { nombre, slug } })
  return NextResponse.json(categoria)
}
