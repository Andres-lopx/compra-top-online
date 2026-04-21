"use client"

import Link from "next/link"
import { useCarrito } from "@/store/carrito"

export default function Navbar() {
const items = useCarrito((state) => state.items)
const cantidadTotal = items.reduce((acc, i) => acc + i.cantidad, 0)

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black">
          CompraTopOnline
        </Link>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <Link href="/productos?categoria=perfumes" className="hover:text-black transition-colors">
            Perfumes
          </Link>
          <Link href="/productos?categoria=relojes" className="hover:text-black transition-colors">
            Relojes
          </Link>
          <Link href="/productos?categoria=gafas" className="hover:text-black transition-colors">
            Gafas
          </Link>
        </div>

        {/* Carrito */}
        <Link href="/carrito" className="text-sm text-gray-600 hover:text-black transition-colors">
          🛒 Carrito ({cantidadTotal})
        </Link>

      </div>
    </nav>
  )
}