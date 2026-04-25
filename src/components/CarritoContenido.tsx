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
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-black mb-8">Tu carrito</h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border border-gray-200 rounded-xl p-4"
          >
            {/* Imagen */}
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
              <span className="text-gray-400 text-xs">Sin imagen</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="font-semibold text-black">{item.nombre}</h2>
              <p className="text-green-600 font-bold">
                ${item.precio.toLocaleString("es-CO")}
              </p>
            </div>

            {/* Cantidad */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => actualizar(item.id, item.cantidad - 1)}
                className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="w-6 text-center font-semibold">{item.cantidad}</span>
              <button
                onClick={() => actualizar(item.id, item.cantidad + 1)}
                className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <p className="font-bold text-black min-w-[80px] text-right">
              ${(item.precio * item.cantidad).toLocaleString("es-CO")}
            </p>

            {/* Eliminar */}
            <button
              onClick={() => eliminar(item.id)}
              className="text-red-400 hover:text-red-600 transition-colors ml-2"
            >
              ✕
            </button>
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
        className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors mt-6"
      >
        Proceder al pago
      </button>
    </main>
  )
}