import { prisma } from "@/lib/prisma"
import FormularioProducto from "../FormularioProducto"

export default async function NuevoProducto() {
  const categorias = await prisma.categoria.findMany({ orderBy: { nombre: "asc" } })

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#1a2744] mb-8">Nuevo producto</h1>
      <FormularioProducto categorias={categorias} />
    </div>
  )
}
