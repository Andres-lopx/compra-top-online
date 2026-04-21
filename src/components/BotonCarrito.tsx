"use client"

import { useCarrito } from "@/store/carrito"

interface Props {
  producto: {
    id: string
    nombre: string
    precio: number
    precioOferta: number | null
    slug: string
  }
}

export default function BotonCarrito({ producto }: Props) {
  const agregar = useCarrito((state) => state.agregar)

  const handleAgregar = () => {
    agregar({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precioOferta ?? producto.precio,
      imagen: "",
      cantidad: 1,
      slug: producto.slug,
    })
    alert(`✅ ${producto.nombre} agregado al carrito`)
  }

  return (
    <button
      onClick={handleAgregar}
      className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
    >
      Agregar al carrito
    </button>
  )
}