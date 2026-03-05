"use client"

import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import { CarouselApi } from "@/components/ui/carousel"


export default function Slider({
  images,
  title,
  index,
  onIndexChange,
}: {
  images: string[]
  title: string
  index: number
  onIndexChange: (index: number) => void
}) {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    api?.scrollTo(index)
  }, [index, api])

  useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      onIndexChange(api.selectedScrollSnap())
    }

    api.on("select", handleSelect)

    return () => {
      api.off("select", handleSelect)
    }
  }, [api, onIndexChange])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="w-full h-full"
    >
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={i}>
            <Image
              src={img}
              alt={title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
