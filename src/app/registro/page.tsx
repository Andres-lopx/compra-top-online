"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegistroPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCargando(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    const password = formData.get("password") as string
    const confirmar = formData.get("confirmar") as string

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden")
      setCargando(false)
      return
    }

    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: formData.get("nombre"),
        email: formData.get("email"),
        password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Error al registrarse")
      setCargando(false)
      return
    }

    router.push("/login")
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-black mb-2">Crear cuenta</h1>
        <p className="text-gray-500 text-sm mb-8">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-black font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Nombre completo
            </label>
            <input
              name="nombre"
              type="text"
              required
              placeholder="Tu nombre"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="tu@email.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              minLength={6}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Confirmar contraseña
            </label>
            <input
              name="confirmar"
              type="password"
              required
              placeholder="••••••••"
              minLength={6}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {cargando ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

      </div>
    </main>
  )
}