export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <span className="text-xl font-bold text-black">
          CompraTopOnline
        </span>

        {/* Links de navegación */}
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="/productos" className="hover:text-black transition-colors">
            Perfumes
          </a>
          <a href="/productos" className="hover:text-black transition-colors">
            Relojes
          </a>
          <a href="/productos" className="hover:text-black transition-colors">
            Gafas
          </a>
        </div>

        {/* Carrito */}
        <div className="flex items-center gap-4">
          <a href="/carrito" className="text-sm text-gray-600 hover:text-black transition-colors">
            🛒 Carrito (0)
          </a>
        </div>

      </div>
    </nav>
  )
}