import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { NextResponse } from "next/server"

async function verificarAdmin() {
  const session = await auth()
  return session?.user?.role === "ADMIN"
}

export async function POST(req: Request) {
  if (!await verificarAdmin()) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()
  const producto = await prisma.producto.create({ data: body })
  return NextResponse.json(producto)
}
