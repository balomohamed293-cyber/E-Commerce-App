"use client"
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function CartIcon({ numOfCartItems , cartOwner }: { numOfCartItems: number ,cartOwner : string }) {

    useEffect(() => {
    if (cartOwner) {
      localStorage.setItem('cartOwner', cartOwner)
    }
  }, [cartOwner])

  const [cartItems, setCartItems] = useState(numOfCartItems)

  useEffect(() => {
    const handlerFn = (e: Event) => {
      const customEvent = e as CustomEvent<number>
      setCartItems(customEvent.detail)
    }

    window.addEventListener('cartItems', handlerFn)
    return () => window.removeEventListener('cartItems', handlerFn)
  }, [])

  return (
    <Link href="/cart" className="relative cursor-pointer">
      <ShoppingCartIcon className="w-6 h-6" />
      <span className="absolute top-0 right-0 text-xs w-4 h-4 bg-black text-white 
                       translate-x-1/2 -translate-y-1/2 font-bold 
                       flex items-center justify-center rounded-full shadow">
        {cartItems || 0}
      </span>
    </Link>
  )
}