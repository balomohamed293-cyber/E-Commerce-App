"use client"

import React, { useState } from 'react'
import Slider from '../Slider/Slider'
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ProductImage({ images, title }: { images: string[], title: string }) {

  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="space-y-4">

      {/* Main Image */}
      <div className=" w-3/4 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
        <Slider images={images} title={title} index={currentIndex}  onIndexChange={setCurrentIndex}/>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {images.map((img, i) => (
          <Button
            key={i}
            variant={'ghost'}
            onClick={() => setCurrentIndex(i)}
            className={`shrink-0 w-24 h-24 rounded-xl border overflow-hidden transition-colors
              ${currentIndex === i 
                ? "border-red-500 dark:border-white bg-black" 
                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"}
            `}
          >
            <Image
              src={img}
              alt={title}
              width={200}
              height={100}
              className='w-full h-full object-cover'
            />
          </Button>
        ))}
      </div>

    </div>
  )
}
