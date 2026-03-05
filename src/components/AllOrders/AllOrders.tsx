"use client"
import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { TruckIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import Image from "next/image"
import { formatCurrency } from "@/helpers/formatCurrency"
import Loading from "@/app/loading"
import Link from "next/link"

export default function AllOrdersComp() {

  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem("cartOwner")

    if (!userId) {
      setLoading(false)
      return
    }

    async function getUserOrders() {
      try {
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
        )
        const data = await response.json()
      const ordersArray = data  
      setOrders(ordersArray.slice().reverse()) 

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getUserOrders()
  }, [])

  if (loading) return <>
    <Loading/>
  </>

  if (!orders.length) return <>
  <div className="text-center py-20">
    <svg
      className="mx-auto w-24 h-24 text-gray-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h18v18H3V3z"
      />
    </svg>
    <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
      No Orders Found
    </h3>
    <p className="mt-2 text-gray-500 dark:text-gray-400">
      You have not placed any orders yet.
    </p>
    <Link href="/products">
      <Button className="mt-6">Start Shopping</Button>
    </Link>
  </div>
  </>

  return (
    
    <div className="space-y-8">

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white dark:bg-gray-900 rounded-xl border shadow-sm p-6"
        >

          {/* Order Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold">
                Order #{order._id.slice(-6)}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toDateString()}
              </p>
            </div>

            <div className="text-right">
              <Button variant="outline" size="sm" disabled>
              <Badge className={
                order.isDelivered
                  ? "bg-green-500 text-green-900"
                  : "bg-yellow-500 text-red-900"
              }>
                {order.isDelivered ? "Delivered" : "Processing"}
              </Badge>
              </Button>

              <p className="text-xl font-bold mt-2">
                {formatCurrency(order.totalOrderPrice)}
              </p>
            </div>
          </div>

          {/* Products Inside Order */}
          <div className="space-y-4">
            {order.cartItems.map((item: any) => (
              <div
                key={item._id}
                className="flex gap-4 border-t pt-4"
              >

                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h4 className="font-semibold">
                    {item.product.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Qty: {item.count}
                  </p>
                </div>

                <div className="font-bold">
                  {formatCurrency(item.price)}
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Info */}
          <div className="flex items-center gap-2 mt-6 text-sm text-gray-600">
            <TruckIcon className="text-green-500 w-5 h-5" />
            <span>
              shipped to: {order.shippingAddress.city}
            </span>
          </div>

        </div>
      ))}

    </div>
  )
}