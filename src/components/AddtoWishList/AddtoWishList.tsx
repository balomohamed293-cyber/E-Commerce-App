"use client"
import { addToWishlistAction } from '@/actions/addToCart.action'
import { AddToWihRes } from '@/interfaces/WishListInterface'
import { Heart, Loader2 } from 'lucide-react'
import React, {  useState } from 'react'
import toast from 'react-hot-toast'

export default function AddtoWishList({productId } : {productId : string}) {
    const [isLoading, setIsLoading] = useState(false)
    async function addToWishList(productId:string) {
        setIsLoading(true)
        try{
            const data : AddToWihRes = await addToWishlistAction(productId);
            toast.success(data.message + '')
            dispatchEvent(new CustomEvent('wishlistItems' , {detail: data.data.length}))

        }catch(err){
            console.log(err);
        }
        setIsLoading(false)
    }
  return <>
  {isLoading && <Loader2 className='animate-spin'/>  }
  <Heart onClick={() => addToWishList(productId)} className="size-5 cursor-pointer text-slate-400 hover:text-red-500 hover:fill-red-500 transition-colors duration-200" />
  </>
}
