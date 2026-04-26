import { prisma } from "@/lib/prisma"
import CambiarEstado from "./CambiarEstado"

const colorEstado: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-700",
  PAGADO: "bg-green-100 text-green-700",
  ENVIADO: "bg-blue-100 text-blue-700",
  ENTREGADO: "bg-gray-100 text-gray-700",
  CANCELADO: "bg-red-100 text-red-700",
}

export default async function AdminOrdenes() {
  const ordenes = await prisma.orden.findMany({
    orderBy: { creadoEn: "desc" },
    include: {
      usuario: true,
      items: { include: { producto: true } },
    },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a2744] mb-8">Órdenes</h1>

      <div className="flex flex-col gap-4">
        {ordenes.map((o) => (
          <div key={o.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold text-[#1a2744]">{o.usuario.nombre}</p>
                <p className="text-sm text-gray-400">{o.usuario.email}</p>
                {o.direccion && (
                  <p className="text-sm text-gray-500 mt-1">📍 {o.direccion}</p>
                )}
                {o.telefono && (
                  <p className="text-sm text-gray-500">📞 {o.telefono}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#f5901e]">
                  ${o.total.toLocaleString("es-CO")}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(o.creadoEn).toLocaleDateString("es-CO", {
                    day: "2-digit", month: "short", year: "numeric"
                  })}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-4 border-t border-gray-100 pt-4 flex flex-col gap-1">
              {o.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span>{item.producto.nombre} x{item.cantidad}</span>
                  <span>${(item.precio * item.cantidad).toLocaleString("es-CO")}</span>
                </div>
              ))}
            </div>

            {/* Estado */}
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorEstado[o.estado]}`}>
                {o.estado}
              </span>
              <CambiarEstado id={o.id} estadoActual={o.estado} />
            </div>
          </div>
        ))}

        {ordenes.length === 0 && (
          <p className="text-center text-gray-400 py-10">No hay órdenes aún</p>
        )}
      </div>
    </div>
  )
}
