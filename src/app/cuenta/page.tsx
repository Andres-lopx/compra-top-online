import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function CuentaPage() {
  const session = await auth()

  if (!session) redirect("/login")

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-black mb-2">Mi cuenta</h1>
      <p className="text-gray-500 mb-8">Bienvenido, {session.user?.name}</p>

      <div className="border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-black mb-4">Información personal</h2>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Nombre</span>
            <span className="font-medium">{session.user?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{session.user?.email}</span>
          </div>
        </div>
      </div>
    </main>
  )
}