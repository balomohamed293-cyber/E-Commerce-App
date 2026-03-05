"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { CartRes } from '@/interfaces/CartInterface'
import { Loader2, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { addToCartAction } from '@/actions/addToCart.action'
import { useRouter } from 'next/navigation'

export default function AddToCart({ProductId} : {ProductId : string}) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function addToCart(productId:string) {
        setIsLoading(true)
        try{
            const data : CartRes = await addToCartAction(productId);
            if(data == null){
                router.push('/login')
            }
            toast.success(data.message + '')
            dispatchEvent(new CustomEvent('cartItems' , {detail: data.numOfCartItems}))

        }catch(err){
            console.log(err);
        }
        setIsLoading(false)
    }

  return <>
    <Button disabled={isLoading} onClick={()=>addToCart(ProductId)} className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900  rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer w-full h-fit">
        {isLoading? <Loader2 className='animate-spin'/> : <ShoppingCartIcon/> }    Add to Cart
    </Button>
  </>
}
