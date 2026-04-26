"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useCarrito } from "@/store/carrito"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const items = useCarrito((state) => state.items)
  const cantidadTotal = items.reduce((acc, i) => acc + i.cantidad, 0)
  const { data: session } = useSession()
  const [abierto, setAbierto] = useState(false)

  return (
    <nav className="w-full bg-white border-b-2 border-[#f5901e] px-4 sm:px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logocompratoponline.png"
            alt="CompraTopOnline"
            width={180}
            height={45}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-[#1a2744]">
          <Link href="/productos?categoria=perfumes" className="hover:text-[#f5901e] transition-colors">Perfumes</Link>
          <Link href="/productos?categoria=relojes" className="hover:text-[#f5901e] transition-colors">Relojes</Link>
          <Link href="/productos?categoria=gafas" className="hover:text-[#f5901e] transition-colors">Gafas</Link>
        </div>

        {/* Derecha desktop */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link
            href="/carrito"
            className="flex items-center gap-1 bg-[#f5901e] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#d97706] transition-colors"
          >
            🛒 <span>Carrito ({cantidadTotal})</span>
          </Link>
          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/cuenta" className="text-[#1a2744] font-medium hover:text-[#f5901e] transition-colors">
                {session.user?.name?.split(" ")[0]}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-400 hover:text-[#f5901e] transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-[#1a2744] font-medium hover:text-[#f5901e] transition-colors">
              Iniciar sesión
            </Link>
          )}
        </div>

        {/* Mobile: carrito + hamburguesa */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/carrito"
            className="bg-[#f5901e] text-white px-3 py-1.5 rounded-full text-sm font-semibold"
          >
            🛒 ({cantidadTotal})
          </Link>
          <button
            onClick={() => setAbierto(!abierto)}
            className="text-[#1a2744] text-2xl leading-none"
            aria-label="Menú"
          >
            {abierto ? "✕" : "☰"}
          </button>
        </div>

      </div>

      {/* Menú mobile */}
      {abierto && (
        <div className="md:hidden mt-3 pt-4 border-t border-gray-100 flex flex-col gap-4 text-sm font-medium text-[#1a2744]">
          <Link href="/productos?categoria=perfumes" onClick={() => setAbierto(false)} className="hover:text-[#f5901e]">Perfumes</Link>
          <Link href="/productos?categoria=relojes" onClick={() => setAbierto(false)} className="hover:text-[#f5901e]">Relojes</Link>
          <Link href="/productos?categoria=gafas" onClick={() => setAbierto(false)} className="hover:text-[#f5901e]">Gafas</Link>
          <div className="border-t border-gray-100 pt-4">
            {session ? (
              <div className="flex flex-col gap-3">
                <Link href="/cuenta" onClick={() => setAbierto(false)} className="hover:text-[#f5901e]">
                  Mi cuenta ({session.user?.name?.split(" ")[0]})
                </Link>
                <button
                  onClick={() => { signOut({ callbackUrl: "/" }); setAbierto(false) }}
                  className="text-left text-gray-400 hover:text-[#f5901e]"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setAbierto(false)} className="hover:text-[#f5901e]">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
