"use client"

import { useRouter } from "next/navigation"

export default function EliminarProducto({ id, nombre }: { id: string; nombre: string }) {
  const router = useRouter()

  const handleEliminar = async () => {
    if (!confirm(`¿Eliminar "${nombre}"?`)) return
    await fetch(`/api/admin/productos/${id}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <button
      onClick={handleEliminar}
      className="text-red-400 hover:text-red-600 font-medium transition-colors"
    >
      Eliminar
    </button>
  )
}
