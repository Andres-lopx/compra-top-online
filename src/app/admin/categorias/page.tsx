import { prisma } from "@/lib/prisma"
import FormularioCategoria from "./FormularioCategoria"
import EliminarCategoria from "./EliminarCategoria"

export default async function AdminCategorias() {
  const categorias = await prisma.categoria.findMany({
    include: { _count: { select: { productos: true } } },
    orderBy: { nombre: "asc" },
  })

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#1a2744] mb-8">Categorías</h1>

      {/* Formulario nueva categoría */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-[#1a2744] mb-4">Nueva categoría</h2>
        <FormularioCategoria />
      </div>

      {/* Lista */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Slug</th>
              <th className="px-6 py-3 text-left">Productos</th>
              <th className="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categorias.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-[#1a2744]">{c.nombre}</td>
                <td className="px-6 py-3 text-gray-400">{c.slug}</td>
                <td className="px-6 py-3">{c._count.productos}</td>
                <td className="px-6 py-3">
                  <EliminarCategoria id={c.id} nombre={c.nombre} cantidad={c._count.productos} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
