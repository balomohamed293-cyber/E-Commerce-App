"use server"
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function updatePasswordAction(data : {currentPassword : string , password : string , rePassword : string}) {

    const session = await getServerSession(authOptions);

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',{
        method : 'PUT',
        headers : {
            token : session?.token as string,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}