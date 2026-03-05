"use server"

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function addToCartAction(productId : string) {

    const session = await getServerSession(authOptions);
    if(session){

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method:'POST',
            body:JSON.stringify({productId : productId }),
            headers:{
                token : session.token as string,
                
                'Content-Type' : 'application/json' 
            }
        });
        const data  = await response.json();
        
        return data 
    }else{
        return null
    }
}
export async function addToWishlistAction(productId : string) {

    const session = await getServerSession(authOptions);
    if(session){

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            method:'POST',
            body:JSON.stringify({productId : productId }),
            headers:{
                token : session.token as string,
                
                'Content-Type' : 'application/json' 
            }
        });
        const data  = await response.json();
        
        return data 
    }else{
        return null
    }
}
export async function removeFromWishlistAction(productId : string) {

    const session = await getServerSession(authOptions);
    if(session){

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method:'DELETE',
            headers:{
                token : session.token as string,
                
                'Content-Type' : 'application/json' 
            }
        });
        const data  = await response.json();
        
        return data 
    }else{
        return null
    }
}