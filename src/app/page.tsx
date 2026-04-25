import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">CompraTopOnline</h1>
        <p className="text-base sm:text-xl text-gray-400 mb-8">
          Perfumes, relojes y accesorios con envío gratis a toda Colombia
        </p>
        <Link
          href="/productos"
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
        >
          Ver productos
        </Link>
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-black mb-8 text-center">
          Categorías
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/productos?categoria=perfumes"
            className="border border-gray-200 rounded-xl p-8 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🌸</div>
            <h3 className="font-semibold text-lg">Perfumes</h3>
          </Link>
          <Link href="/productos?categoria=relojes"
            className="border border-gray-200 rounded-xl p-8 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">⌚</div>
            <h3 className="font-semibold text-lg">Relojes</h3>
          </Link>
          <Link href="/productos?categoria=gafas"
            className="border border-gray-200 rounded-xl p-8 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🕶️</div>
            <h3 className="font-semibold text-lg">Gafas</h3>
          </Link>
        </div>
      </section>

    </main>
  )
}