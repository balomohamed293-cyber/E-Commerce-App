"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
import { CartRes } from '@/interfaces/CartInterface'
import { formatCurrency } from '@/helpers/formatCurrency'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Loader2, ArrowLeft } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { clearCartAction, deleteSpecificProductAction, updateProductAction } from '@/actions/cartActions'
import CheckOut from '../CheckOut/CheckOut'

export default function CartComp({ cartData }: { cartData: CartRes | null }) {
  const [cart, setCart] = useState<CartRes | null>(cartData || null)
  const [loading, setLoading] = useState<string | null>(null)

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('cartItems', { detail: cart?.numOfCartItems || 0 })
    )
  }, [cart?.numOfCartItems])

  async function updateProduct(productId: string, count: number) {
    setLoading(productId)
    const response: CartRes = await updateProductAction(productId, count)
    if (response.status === "success") {
      setCart(response)
      toast.success("Product Updated Successfully")
    }
    setLoading(null)
  }

  async function deleteCartProduct(productId: string) {
    setLoading(productId)
    const response: CartRes = await deleteSpecificProductAction(productId)
    if (response.status === "success") {
      setCart(response)
      window.dispatchEvent(
        new CustomEvent('cartItems', { detail: response.numOfCartItems })
      )
      toast.success("Product Deleted Successfully")
    }
    setLoading(null)
  }

  async function clearCart() {
    setLoading('clear')
    const response: CartRes = await clearCartAction()
    if (response.message === "success") {
      setCart(null)
      // dispatch 0
      window.dispatchEvent(
        new CustomEvent('cartItems', { detail: 0 })
      )
      toast.success("Cart Cleared Successfully")
    }
    setLoading(null)
  }

  
  return (
    <>
      {cart && cart.numOfCartItems > 0 ? (
        <main className="max-w-7xl mx-auto w-full px-4 md:px-10 py-3">
          <h1 className="text-4xl font-black mb-2">Shopping Cart</h1>
          <p className="text-lg mb-10">You have {cart.numOfCartItems} items in your cart ready for checkout.</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cart.data.products.map(item => (
                <div key={item._id} className="bg-white rounded-xl p-5 border shadow flex flex-col sm:flex-row gap-6 items-center">
                  <div className="size-32 rounded-lg overflow-hidden border relative">
                    {loading === item.product.id && (
                      <div className="absolute inset-0 flex justify-center items-center bg-white/80">
                        <Loader2 className='animate-spin' />
                      </div>
                    )}
                    <Image src={item.product.imageCover} alt={item.product.title} width={400} height={100} />
                  </div>

                  <div className="flex-1 flex flex-col sm:flex-row justify-between w-full">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold">{item.product.title}</h3>
                      <p className="text-sm">{item.product.category.name} | {item.product.brand.name}</p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end justify-between gap-4 mt-4 sm:mt-0">
                      <div className="text-xl font-bold">{formatCurrency(item.price)}</div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-background-light rounded-lg border p-1">
                          <Button
                            disabled={item.count === 1}
                            variant='ghost'
                            onClick={() => updateProduct(item.product.id, item.count - 1)}
                          >-</Button>
                          <Input className="w-10 text-center" type="text" value={item.count} readOnly />
                          <Button
                            disabled={item.count === item.product.quantity}
                            variant='ghost'
                            onClick={() => updateProduct(item.product.id, item.count + 1)}
                          >+</Button>
                        </div>
                        <Button
                          onClick={() => deleteCartProduct(item.product.id)}
                          variant='ghost'
                          className="cursor-pointer bg-none flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all w-fit hover:text-red-400 hover:bg-transparent-400"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <div className="pt-6 flex justify-between">
                <Link href="/products" className="flex items-center gap-2 text-primary font-bold">
                  <ArrowLeft /> Continue Shopping
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <span  className="cursor-pointer bg-none flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all w-fit hover:text-red-400 hover:bg-transparent-400">
                      {loading === "clear" && <Loader2 className='animate-spin' />} Clear Cart
                    </span>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>This will delete all cart items.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => clearCart()}
                        disabled={loading === "clear"}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-xl p-8 border shadow-xl">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[#606e8a]">
                    <span>Subtotal ({cart.numOfCartItems} items)</span>
                    <span className="text-[#111318] font-semibold">{formatCurrency(cart.data.totalCartPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[#606e8a]">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold uppercase text-xs">Calculated At CheckOut</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold">Total Order</span>
                    <span className="text-2xl font-black text-primary">{formatCurrency(cart.data.totalCartPrice)}</span>
                  </div>
                </div>

                <CheckOut cartId = {cart.cartId}  setCart={setCart} />
              </div>
            </aside>
          </div>
        </main>
      ) : (
        <div className="min-h-[60vh] flex justify-center items-center flex-col">
          <h2 className="text-2xl mb-3">Your Cart Is Empty</h2>
          <Link href="/products">
            <Button>Add Items</Button>
          </Link>
        </div>
      )}
    </>
  )
}