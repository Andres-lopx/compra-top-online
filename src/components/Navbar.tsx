"use client"

import Link from "next/link"
import { useCarrito } from "@/store/carrito"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const items = useCarrito((state) => state.items)
  const cantidadTotal = items.reduce((acc, i) => acc + i.cantidad, 0)
  const { data: session } = useSession()

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

        {/* Derecha */}
        <div className="flex items-center gap-4 text-sm">
          <Link href="/carrito" className="text-gray-600 hover:text-black transition-colors">
            🛒 Carrito ({cantidadTotal})
          </Link>

          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/cuenta" className="text-gray-600 hover:text-black transition-colors">
                {session.user?.name?.split(" ")[0]}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-400 hover:text-black transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-black transition-colors">
              Iniciar sesión
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}