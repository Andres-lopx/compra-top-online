import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function ProductosPage() {
  const productos = await prisma.producto.findMany({
    include: {
      categoria: true,
    },
  })

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-black mb-8">
        Todos los productos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <Link
            key={producto.id}
            href={`/productos/${producto.slug}`}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            {/* Imagen placeholder */}
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Sin imagen</span>
            </div>

            {/* Categoría */}
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {producto.categoria.nombre}
            </span>

            {/* Nombre */}
            <h2 className="text-sm font-semibold text-black mt-1 mb-2">
              {producto.nombre}
            </h2>

            {/* Precio */}
            <div className="flex items-center gap-2">
              {producto.precioOferta ? (
                <>
                  <span className="text-green-600 font-bold">
                    ${producto.precioOferta.toLocaleString("es-CO")}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ${producto.precio.toLocaleString("es-CO")}
                  </span>
                </>
              ) : (
                <span className="text-black font-bold">
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