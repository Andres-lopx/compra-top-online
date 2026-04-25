"use client"

import { useState, useEffect } from "react"
import { useCarrito } from "@/store/carrito"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, total } = useCarrito()
  const { data: session } = useSession()
  const router = useRouter()
  const [cargando, setCargando] = useState(false)
  const [telefono, setTelefono] = useState("")
  const [direccion, setDireccion] = useState("")
  const [listo, setListo] = useState(false)

  useEffect(() => {
    if (items.length === 0) {
      router.push("/carrito")
      return
    }
    if (!session) {
      router.push("/login")
      return
    }
    setListo(true)
  }, [items, session])

  const handlePago = async () => {
    setCargando(true)

    const res = await fetch("/api/ordenes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        total: total(),
        telefono,
        direccion,
      }),
    })

    const data = await res.json()
    console.log("Respuesta del servidor:", data)
    if (!res.ok) {
      alert("Error al crear la orden")
      setCargando(false)
      return
    }
// En vez de abrir el widget, redirigimos a Wompi
const params = new URLSearchParams({
  "public-key": process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY!,
  "currency": "COP",
  "amount-in-cents": data.montoEnCentavos.toString(),
  "reference": data.referencia,
  "signature:integrity": data.firma,
  "redirect-url": `${window.location.origin}/orden/confirmacion`,
  "customer-data:email": session?.user?.email || "",
  "customer-data:full-name": session?.user?.name || "",
  "customer-data:phone-number": telefono,
  "customer-data:phone-number-prefix": "+57",
})

window.location.href = `https://checkout.wompi.co/p/?${params.toString()}`
  }

  if (!listo) return null

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>

      <div className="flex flex-col gap-6">

        {/* Resumen */}
        <div className="border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-black mb-4">Resumen del pedido</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span>{item.nombre} x{item.cantidad}</span>
              <span className="font-medium">${(item.precio * item.cantidad).toLocaleString("es-CO")}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span className="text-green-600">${total().toLocaleString("es-CO")}</span>
          </div>
        </div>

        {/* Datos de envío */}
        <div className="border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-black mb-4">Datos de envío</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="3001234567"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Dirección de entrega
              </label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Calle 123 #45-67, Medellín"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* Botón pagar */}
        <button
          onClick={handlePago}
          disabled={cargando || !telefono || !direccion}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {cargando ? "Procesando..." : `Pagar $${total().toLocaleString("es-CO")}`}
        </button>

      </div>
    </main>
  )
}