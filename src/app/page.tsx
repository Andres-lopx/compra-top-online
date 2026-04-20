import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h1 className="text-5xl font-bold text-black">CompraTopOnline</h1>
        <p className="mt-4 text-xl text-gray-400">
          Tu tienda favorita de perfumes y relojes
        </p>
      </div>
    </main>
  )
}