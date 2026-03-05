import { RegisterData } from "@/interfaces/RegisterData";


export default async function registerAction(data : RegisterData) {
    const response =await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup' , {
        method:"POST" ,
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(data)
    })
    const res = await response.json();
    return res;
}