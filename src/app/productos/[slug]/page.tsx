import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import BotonCarrito from "@/components/BotonCarrito"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params

  const producto = await prisma.producto.findUnique({
    where: { slug },
    include: { categoria: true },
  })

  if (!producto) return notFound()

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {/* Imagen */}
        <div className="w-full h-72 sm:h-96 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="text-gray-400">Sin imagen</span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="text-xs text-[#f5901e] uppercase tracking-wide font-semibold mb-2">
            {producto.categoria.nombre}
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2744] mb-4">
            {producto.nombre}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {producto.descripcion}
          </p>

          <div className="flex items-center gap-3 mb-4">
            {producto.precioOferta ? (
              <>
                <span className="text-3xl font-bold text-[#f5901e]">
                  ${producto.precioOferta.toLocaleString("es-CO")}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ${producto.precio.toLocaleString("es-CO")}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-[#1a2744]">
                ${producto.precio.toLocaleString("es-CO")}
              </span>
            )}
          </div>

          <p className="text-sm mb-6">
            {producto.stock > 0 ? (
              <span className="text-green-600 font-medium">✓ {producto.stock} unidades disponibles</span>
            ) : (
              <span className="text-red-500 font-medium">Sin stock</span>
            )}
          </p>

          <BotonCarrito producto={producto} />
        </div>

      </div>
    </main>
  )
}
