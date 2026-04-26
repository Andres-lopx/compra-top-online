import Link from "next/link"

const links = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/productos", label: "Productos", icon: "📦" },
  { href: "/admin/ordenes", label: "Órdenes", icon: "🛒" },
  { href: "/admin/categorias", label: "Categorías", icon: "🏷️" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-56 bg-[#1a2744] text-white flex flex-col flex-shrink-0">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Panel</p>
          <p className="font-bold text-white text-lg">Admin</p>
        </div>
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
            ← Volver a la tienda
          </Link>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>

    </div>
  )
}
