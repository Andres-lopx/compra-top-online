"use client"

import { useCarrito } from "@/store/carrito"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CarritoContenido() {
  const { items, eliminar, actualizar, total } = useCarrito()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-black mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-8">Agrega productos para continuar</p>
        <Link
          href="/productos"
          className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          Ver productos
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2744] mb-8">Tu carrito</h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-4">

              {/* Imagen */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Sin imagen</span>
              </div>

              {/* Info + acciones */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-black text-sm leading-tight">{item.nombre}</h2>
                  <button
                    onClick={() => eliminar(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 text-sm"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-green-600 font-bold text-sm mt-1">
                  ${item.precio.toLocaleString("es-CO")}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => actualizar(item.id, item.cantidad - 1)}
                      className="w-7 h-7 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-sm"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-semibold text-sm">{item.cantidad}</span>
                    <button
                      onClick={() => actualizar(item.id, item.cantidad + 1)}
                      className="w-7 h-7 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-black text-sm">
                    ${(item.precio * item.cantidad).toLocaleString("es-CO")}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
        <span className="text-xl font-bold text-black">Total</span>
        <span className="text-2xl font-bold text-green-600">
          ${total().toLocaleString("es-CO")}
        </span>
      </div>

      {/* Botón checkout */}
      <button
        onClick={() => router.push("/checkout")}
        className="w-full bg-[#f5901e] text-white py-4 rounded-xl font-semibold hover:bg-[#d97706] transition-colors mt-6 shadow-md"
      >
        Proceder al pago
      </button>
    </main>
  )
}
