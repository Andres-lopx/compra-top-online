"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Categoria {
  id: string
  nombre: string
}

interface Producto {
  id: string
  nombre: string
  slug: string
  descripcion: string | null
  precio: number
  precioOferta: number | null
  stock: number
  activo: boolean
  categoriaId: string
  imagenes: string[]
}

interface Props {
  categorias: Categoria[]
  producto?: Producto
}

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export default function FormularioProducto({ categorias, producto }: Props) {
  const router = useRouter()
  const [cargando, setCargando] = useState(false)
  const [form, setForm] = useState({
    nombre: producto?.nombre ?? "",
    slug: producto?.slug ?? "",
    descripcion: producto?.descripcion ?? "",
    precio: producto?.precio?.toString() ?? "",
    precioOferta: producto?.precioOferta?.toString() ?? "",
    stock: producto?.stock?.toString() ?? "0",
    activo: producto?.activo ?? true,
    categoriaId: producto?.categoriaId ?? categorias[0]?.id ?? "",
    imagenes: producto?.imagenes?.join(", ") ?? "",
  })

  const set = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleNombre = (nombre: string) => {
    setForm((f) => ({ ...f, nombre, slug: toSlug(nombre) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)

    const body = {
      nombre: form.nombre,
      slug: form.slug,
      descripcion: form.descripcion || null,
      precio: parseFloat(form.precio),
      precioOferta: form.precioOferta ? parseFloat(form.precioOferta) : null,
      stock: parseInt(form.stock),
      activo: form.activo,
      categoriaId: form.categoriaId,
      imagenes: form.imagenes.split(",").map((s) => s.trim()).filter(Boolean),
    }

    const url = producto
      ? `/api/admin/productos/${producto.id}`
      : "/api/admin/productos"

    const method = producto ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      router.push("/admin/productos")
      router.refresh()
    } else {
      alert("Error al guardar el producto")
      setCargando(false)
    }
  }

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f5901e]"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5">

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nombre *</label>
          <input
            className={inputClass}
            value={form.nombre}
            onChange={(e) => handleNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input
            className={inputClass}
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Descripción</label>
        <textarea
          className={inputClass}
          rows={3}
          value={form.descripcion}
          onChange={(e) => set("descripcion", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Precio *</label>
          <input
            type="number"
            className={inputClass}
            value={form.precio}
            onChange={(e) => set("precio", e.target.value)}
            required
            min={0}
          />
        </div>
        <div>
          <label className={labelClass}>Precio oferta</label>
          <input
            type="number"
            className={inputClass}
            value={form.precioOferta}
            onChange={(e) => set("precioOferta", e.target.value)}
            min={0}
          />
        </div>
        <div>
          <label className={labelClass}>Stock *</label>
          <input
            type="number"
            className={inputClass}
            value={form.stock}
            onChange={(e) => set("stock", e.target.value)}
            required
            min={0}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Categoría *</label>
          <select
            className={inputClass}
            value={form.categoriaId}
            onChange={(e) => set("categoriaId", e.target.value)}
            required
          >
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.activo}
              onChange={(e) => set("activo", e.target.checked)}
              className="w-4 h-4 accent-[#f5901e]"
            />
            <span className="text-sm font-medium text-gray-700">Producto activo</span>
          </label>
        </div>
      </div>

      <div>
        <label className={labelClass}>URLs de imágenes (separadas por coma)</label>
        <input
          className={inputClass}
          value={form.imagenes}
          onChange={(e) => set("imagenes", e.target.value)}
          placeholder="https://ejemplo.com/img1.jpg, https://ejemplo.com/img2.jpg"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={cargando}
          className="bg-[#f5901e] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#d97706] transition-colors disabled:opacity-50"
        >
          {cargando ? "Guardando..." : producto ? "Guardar cambios" : "Crear producto"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/productos")}
          className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>

    </form>
  )
}
