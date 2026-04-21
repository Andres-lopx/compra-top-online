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
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Imagen */}
        <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="text-gray-400">Sin imagen</span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="text-xs text-gray-400 uppercase tracking-wide mb-2">
            {producto.categoria.nombre}
          </span>

          <h1 className="text-3xl font-bold text-black mb-4">
            {producto.nombre}
          </h1>

          <p className="text-gray-600 mb-6">
            {producto.descripcion}
          </p>

          <div className="flex items-center gap-3 mb-6">
            {producto.precioOferta ? (
              <>
                <span className="text-3xl font-bold text-green-600">
                  ${producto.precioOferta.toLocaleString("es-CO")}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ${producto.precio.toLocaleString("es-CO")}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-black">
                ${producto.precio.toLocaleString("es-CO")}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-6">
            {producto.stock > 0
              ? `${producto.stock} unidades disponibles`
              : "Sin stock"}
          </p>

          <BotonCarrito producto={producto} />
        </div>

      </div>
    </main>
  )
}