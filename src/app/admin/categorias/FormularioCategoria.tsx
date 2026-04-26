"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export default function FormularioCategoria() {
  const router = useRouter()
  const [nombre, setNombre] = useState("")
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    const res = await fetch("/api/admin/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, slug: toSlug(nombre) }),
    })
    if (res.ok) {
      setNombre("")
      router.refresh()
    } else {
      alert("Error al crear la categoría")
    }
    setCargando(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f5901e]"
        placeholder="Nombre de la categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={cargando}
        className="bg-[#f5901e] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#d97706] transition-colors disabled:opacity-50"
      >
        {cargando ? "..." : "Crear"}
      </button>
    </form>
  )
}
