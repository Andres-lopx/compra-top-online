import Link from "next/link"
import Carrusel from "@/components/Carrusel"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Carrusel */}
      <Carrusel />

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-[#1a2744] mb-8 text-center">
          Categorías
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/productos?categoria=perfumes"
            className="border-2 border-gray-100 rounded-xl p-8 text-center hover:border-[#f5901e] hover:shadow-md transition-all group"
          >
            <div className="text-4xl mb-3">🌸</div>
            <h3 className="font-semibold text-lg text-[#1a2744] group-hover:text-[#f5901e] transition-colors">Perfumes</h3>
          </Link>
          <Link
            href="/productos?categoria=relojes"
            className="border-2 border-gray-100 rounded-xl p-8 text-center hover:border-[#f5901e] hover:shadow-md transition-all group"
          >
            <div className="text-4xl mb-3">⌚</div>
            <h3 className="font-semibold text-lg text-[#1a2744] group-hover:text-[#f5901e] transition-colors">Relojes</h3>
          </Link>
          <Link
            href="/productos?categoria=gafas"
            className="border-2 border-gray-100 rounded-xl p-8 text-center hover:border-[#f5901e] hover:shadow-md transition-all group"
          >
            <div className="text-4xl mb-3">🕶️</div>
            <h3 className="font-semibold text-lg text-[#1a2744] group-hover:text-[#f5901e] transition-colors">Gafas</h3>
          </Link>
        </div>
      </section>

      {/* Banner envío gratis */}
      <section className="bg-[#1a2744] text-white py-10 px-6 text-center">
        <p className="text-lg sm:text-2xl font-bold">🚚 Envío gratis a toda Colombia</p>
        <p className="text-sm sm:text-base mt-2 text-gray-300">En todos tus pedidos, sin mínimo de compra</p>
      </section>

    </main>
  )
}
