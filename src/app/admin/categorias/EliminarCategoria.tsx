"use client"

import { useRouter } from "next/navigation"

export default function EliminarCategoria({ id, nombre, cantidad }: { id: string; nombre: string; cantidad: number }) {
  const router = useRouter()

  const handleEliminar = async () => {
    if (cantidad > 0) {
      alert(`No puedes eliminar "${nombre}" porque tiene ${cantidad} producto(s) asignado(s).`)
      return
    }
    if (!confirm(`¿Eliminar la categoría "${nombre}"?`)) return
    await fetch(`/api/admin/categorias/${id}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <button
      onClick={handleEliminar}
      className="text-red-400 hover:text-red-600 font-medium transition-colors text-sm"
    >
      Eliminar
    </button>
  )
}
