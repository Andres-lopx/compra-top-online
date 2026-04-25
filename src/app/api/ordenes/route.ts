import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { createHash } from "crypto"

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json(
        { error: "Debes iniciar sesión" },
        { status: 401 }
      )
    }

    const { items, total, telefono, direccion } = await request.json()

    const usuario = await prisma.usuario.findUnique({
      where: { email: session.user?.email! },
    })

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    const orden = await prisma.orden.create({
      data: {
        usuarioId: usuario.id,
        total,
        telefono,
        direccion,
        items: {
          create: items.map((item: any) => ({
            productoId: item.id,
            cantidad: item.cantidad,
            precio: item.precio,
          })),
        },
      },
    })

    // Generar firma de integridad
    const referencia = `orden-${orden.id}-${Date.now()}`
    const montoEnCentavos = total * 100
    const secreto = process.env.WOMPI_INTEGRITY_KEY!
    const cadena = `${referencia}${montoEnCentavos}COP${secreto}`
    const firma = createHash("sha256").update(cadena).digest("hex")
    
    console.log("Firma:", firma)
    console.log("=== WOMPI DEBUG ===")
    console.log("Referencia:", referencia)
    console.log("Monto:", montoEnCentavos)
    console.log("Cadena:", cadena)

    return NextResponse.json({
      ordenId: orden.id,
      referencia,
      montoEnCentavos,
      firma,
    }, { status: 201 })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}