import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function CuentaPage() {
  const session = await auth()

  if (!session) redirect("/login")

  const isAdmin = (session.user as any)?.role === "ADMIN"

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-[#1a2744] mb-2">Mi cuenta</h1>
      <p className="text-gray-500 mb-8">Bienvenido, {session.user?.name}</p>

      <div className="flex flex-col gap-4">
        <div className="border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-[#1a2744] mb-4">Información personal</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Nombre</span>
              <span className="font-medium">{session.user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{session.user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Rol</span>
              <span className="font-medium">{isAdmin ? "Administrador" : "Cliente"}</span>
            </div>
          </div>
        </div>

        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center justify-between border-2 border-[#f5901e] rounded-xl p-5 hover:bg-orange-50 transition-colors group"
          >
            <div>
              <p className="font-semibold text-[#1a2744] group-hover:text-[#f5901e] transition-colors">
                Panel de administración
              </p>
              <p className="text-sm text-gray-400 mt-0.5">Gestiona productos, órdenes y categorías</p>
            </div>
            <span className="text-2xl">→</span>
          </Link>
        )}
      </div>
    </main>
  )
}
