import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as dotenv from "dotenv"

dotenv.config()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const perfumes = await prisma.categoria.upsert({
    where: { slug: "perfumes" },
    update: {},
    create: { nombre: "Perfumes", slug: "perfumes" },
  })

  const relojes = await prisma.categoria.upsert({
    where: { slug: "relojes" },
    update: {},
    create: { nombre: "Relojes", slug: "relojes" },
  })

  const gafas = await prisma.categoria.upsert({
    where: { slug: "gafas" },
    update: {},
    create: { nombre: "Gafas", slug: "gafas" },
  })

  await prisma.producto.upsert({
    where: { slug: "amatista-misteriosa" },
    update: {},
    create: {
      nombre: "Amatista Misteriosa",
      slug: "amatista-misteriosa",
      descripcion: "Inspirado en Lattafa Amethyste Unisex.",
      precio: 60000,
      precioOferta: 45000,
      imagenes: [],
      stock: 20,
      categoriaId: perfumes.id,
    },
  })

  await prisma.producto.upsert({
    where: { slug: "ambar-carmesi" },
    update: {},
    create: {
      nombre: "Ámbar Carmesí",
      slug: "ambar-carmesi",
      descripcion: "Inspirado en Orientica Amber Rouge Unisex.",
      precio: 60000,
      precioOferta: 45000,
      imagenes: [],
      stock: 15,
      categoriaId: perfumes.id,
    },
  })

  await prisma.producto.upsert({
    where: { slug: "reloj-deportivo-yess" },
    update: {},
    create: {
      nombre: "Reloj Deportivo YESS",
      slug: "reloj-deportivo-yess",
      descripcion: "Reloj deportivo sumergible para caballero.",
      precio: 180000,
      imagenes: [],
      stock: 10,
      categoriaId: relojes.id,
    },
  })

  await prisma.producto.upsert({
    where: { slug: "gafas-deportivas-hombre" },
    update: {},
    create: {
      nombre: "Gafas Deportivas Hombre",
      slug: "gafas-deportivas-hombre",
      descripcion: "Gafas deportivas UV400.",
      precio: 75000,
      imagenes: [],
      stock: 25,
      categoriaId: gafas.id,
    },
  })

  console.log("✅ Base de datos poblada con éxito")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })