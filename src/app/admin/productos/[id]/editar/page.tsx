import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import FormularioProducto from "../../FormularioProducto"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditarProducto({ params }: Props) {
  const { id } = await params
  const [producto, categorias] = await Promise.all([
    prisma.producto.findUnique({ where: { id } }),
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
  ])

  if (!producto) return notFound()

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#1a2744] mb-8">Editar producto</h1>
      <FormularioProducto categorias={categorias} producto={producto} />
    </div>
  )
}
