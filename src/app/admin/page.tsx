import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const [productos, ordenes, usuarios, ingresos] = await Promise.all([
    prisma.producto.count(),
    prisma.orden.count(),
    prisma.usuario.count(),
    prisma.orden.aggregate({ _sum: { total: true } }),
  ])

  const ordenesRecientes = await prisma.orden.findMany({
    take: 5,
    orderBy: { creadoEn: "desc" },
    include: { usuario: true },
  })

  const stats = [
    { label: "Productos", value: productos, icon: "📦", color: "bg-blue-50 text-blue-700" },
    { label: "Órdenes", value: ordenes, icon: "🛒", color: "bg-orange-50 text-orange-700" },
    { label: "Usuarios", value: usuarios, icon: "👤", color: "bg-green-50 text-green-700" },
    {
      label: "Ingresos",
      value: `$${(ingresos._sum.total ?? 0).toLocaleString("es-CO")}`,
      icon: "💰",
      color: "bg-yellow-50 text-yellow-700",
    },
  ]

  const colorEstado: Record<string, string> = {
    PENDIENTE: "bg-yellow-100 text-yellow-700",
    PAGADO: "bg-green-100 text-green-700",
    ENVIADO: "bg-blue-100 text-blue-700",
    ENTREGADO: "bg-gray-100 text-gray-700",
    CANCELADO: "bg-red-100 text-red-700",
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a2744] mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl p-5 ${s.color}`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm mt-1 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Órdenes recientes */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-[#1a2744]">Órdenes recientes</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Cliente</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Estado</th>
              <th className="px-6 py-3 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ordenesRecientes.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-[#1a2744]">{o.usuario.nombre}</td>
                <td className="px-6 py-3">${o.total.toLocaleString("es-CO")}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorEstado[o.estado]}`}>
                    {o.estado}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-400">
                  {new Date(o.creadoEn).toLocaleDateString("es-CO")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
