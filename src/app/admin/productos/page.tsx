import { prisma } from "@/lib/prisma"
import Link from "next/link"
import EliminarProducto from "./EliminarProducto"

export default async function AdminProductos() {
  const productos = await prisma.producto.findMany({
    include: { categoria: true },
    orderBy: { creadoEn: "desc" },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1a2744]">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="bg-[#f5901e] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#d97706] transition-colors"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Categoría</th>
              <th className="px-6 py-3 text-left">Precio</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Activo</th>
              <th className="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {productos.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-[#1a2744]">{p.nombre}</td>
                <td className="px-6 py-3 text-gray-500">{p.categoria.nombre}</td>
                <td className="px-6 py-3">
                  {p.precioOferta ? (
                    <span className="text-[#f5901e] font-semibold">
                      ${p.precioOferta.toLocaleString("es-CO")}
                    </span>
                  ) : (
                    <span>${p.precio.toLocaleString("es-CO")}</span>
                  )}
                </td>
                <td className="px-6 py-3">
                  <span className={`font-semibold ${p.stock === 0 ? "text-red-500" : "text-green-600"}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {p.activo ? "Sí" : "No"}
                  </span>
                </td>
                <td className="px-6 py-3 flex items-center gap-3">
                  <Link
                    href={`/admin/productos/${p.id}/editar`}
                    className="text-[#1a2744] hover:text-[#f5901e] font-medium transition-colors"
                  >
                    Editar
                  </Link>
                  <EliminarProducto id={p.id} nombre={p.nombre} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {productos.length === 0 && (
          <p className="text-center text-gray-400 py-10">No hay productos aún</p>
        )}
      </div>
    </div>
  )
}
