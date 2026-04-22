import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { nombre, email, password } = await request.json()

    // Validaciones
    if (!nombre || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener mínimo 6 caracteres" },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { email },
    })

    if (usuarioExiste) {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 400 }
      )
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 12)

    // Crear usuario
    await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: passwordHash,
      },
    })

    return NextResponse.json(
      { message: "Usuario creado exitosamente" },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}