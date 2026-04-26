"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const estados = ["PENDIENTE", "PAGADO", "ENVIADO", "ENTREGADO", "CANCELADO"]

export default function CambiarEstado({ id, estadoActual }: { id: string; estadoActual: string }) {
  const router = useRouter()
  const [cargando, setCargando] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCargando(true)
    await fetch(`/api/admin/ordenes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: e.target.value }),
    })
    router.refresh()
    setCargando(false)
  }

  return (
    <select
      value={estadoActual}
      onChange={handleChange}
      disabled={cargando}
      className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#f5901e] disabled:opacity-50"
    >
      {estados.map((e) => (
        <option key={e} value={e}>{e}</option>
      ))}
    </select>
  )
}
