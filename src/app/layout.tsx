import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CompraTopOnline",
  description: "Tu tienda favorita de perfumes, relojes y accesorios en Colombia",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        {children}
      </body>
    </html>
  )
}