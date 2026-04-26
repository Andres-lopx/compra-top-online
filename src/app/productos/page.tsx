import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function ProductosPage() {
  const productos = await prisma.producto.findMany({
    include: { categoria: true },
  })

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2744] mb-8">
        Todos los productos
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {productos.map((producto: any) => (
          <Link
            key={producto.id}
            href={`/productos/${producto.slug}`}
            className="border-2 border-gray-100 rounded-xl p-4 hover:border-[#f5901e] hover:shadow-md transition-all group"
          >
            {/* Imagen */}
            <div className="w-full h-36 sm:h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-xs">Sin imagen</span>
            </div>

            {/* Categoría */}
            <span className="text-xs text-[#f5901e] uppercase tracking-wide font-medium">
              {producto.categoria.nombre}
            </span>

            {/* Nombre */}
            <h2 className="text-sm font-semibold text-[#1a2744] mt-1 mb-2 group-hover:text-[#f5901e] transition-colors leading-tight">
              {producto.nombre}
            </h2>

            {/* Precio */}
            <div className="flex items-center gap-2 flex-wrap">
              {producto.precioOferta ? (
                <>
                  <span className="text-[#f5901e] font-bold">
                    ${producto.precioOferta.toLocaleString("es-CO")}
                  </span>
                  <span className="text-gray-400 line-through text-xs">
                    ${producto.precio.toLocaleString("es-CO")}
                  </span>
                </>
              ) : (
                <span className="text-[#1a2744] font-bold">
                  ${producto.precio.toLocaleString("es-CO")}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
