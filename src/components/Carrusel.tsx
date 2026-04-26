"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"
import { useCallback } from "react"

const imagenes = [
  { src: "/carrusel/imagen1.png", alt: "Banner 1" },
  { src: "/carrusel/imagen2.png", alt: "Banner 2" },
  { src: "/carrusel/imagen3.png", alt: "Banner 3" },
]

export default function Carrusel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ])

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div>
      {/* Slider */}
      <div className="relative w-full bg-[#1a2744]">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {imagenes.map((img) => (
              <div key={img.src} className="flex-[0_0_100%] min-w-0">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1400}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Flecha anterior */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors"
          aria-label="Anterior"
        >
          ‹
        </button>

        {/* Flecha siguiente */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors"
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>

      {/* Botón ver productos */}
      <div className="flex justify-center py-6 bg-white">
        <Link
          href="/productos"
          className="bg-[#f5901e] text-white px-10 py-3 rounded-full font-semibold hover:bg-[#d97706] transition-colors shadow-md text-base"
        >
          Ver productos
        </Link>
      </div>
    </div>
  )
}
