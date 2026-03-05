import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white z-50">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <span className="text-black font-extrabold text-3xl tracking-wide">
          ShopMart
        </span>
      </div>

      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-gray-500 text-sm tracking-wider animate-pulse">
        Loading your shopping experience...
      </p>

    </div>
  )
}
