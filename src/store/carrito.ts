import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ItemCarrito {
  id: string
  nombre: string
  precio: number
  imagen: string
  cantidad: number
  slug: string
}

interface CarritoStore {
  items: ItemCarrito[]
  agregar: (item: ItemCarrito) => void
  eliminar: (id: string) => void
  actualizar: (id: string, cantidad: number) => void
  vaciar: () => void
  total: () => number
  cantidadTotal: () => number
}

export const useCarrito = create<CarritoStore>()(
  persist(
    (set, get) => ({
      items: [],

      agregar: (item) => {
        const items = get().items
        const existe = items.find((i) => i.id === item.id)
        if (existe) {
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, cantidad: i.cantidad + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { ...item, cantidad: 1 }] })
        }
      },

      eliminar: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },

      actualizar: (id, cantidad) => {
        if (cantidad <= 0) {
          get().eliminar(id)
          return
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, cantidad } : i
          ),
        })
      },

      vaciar: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (acc, i) => acc + i.precio * i.cantidad,
          0
        ),

      cantidadTotal: () =>
        get().items.reduce((acc, i) => acc + i.cantidad, 0),
    }),
    {
      name: "carrito",
    }
  )
)