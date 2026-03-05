"use server"
import { authOptions } from "@/auth";
import { Data } from "@/interfaces/UserAddressesInterface";
import { getServerSession } from "next-auth";

export async function getUserAddressesAction() {

    const session = await getServerSession(authOptions);
    if(session){

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
            headers:{
                token : session.token as string,
            }
        });
        const data  = await response.json();
        
        return data 
    }else{
        return null
    }
}
export async function addAddressAction(addressData: Data) {

    const session = await getServerSession(authOptions);
    if(session){

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: session?.token as string
            },
            body: JSON.stringify(addressData)
        });
        const data = await response.json();
        return data;
    }else{
        return null
    }
}
export async function removeAddressAction(addressId: string) {

    const session = await getServerSession(authOptions);
    if(session){

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                token: session?.token as string
            },
        });
        const data = await response.json();
        return data;
    }else{
        return null
    }
}