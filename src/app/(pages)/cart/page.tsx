import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

import React from 'react'
import CartComp from './../../../components/Cart/Cart';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { CartRes } from '@/interfaces/CartInterface';
import { HomeIcon } from 'lucide-react';

export default async function Cart() {
  const session = await getServerSession(authOptions)
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
    headers:{
      token : session?.token as string
    }
  })
  const data : CartRes = await response.json();
  return <>
  {/* Breadcrumbs */}
  <Breadcrumb className='my-2 pb-2'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className='flex gap-2 items-center'><HomeIcon className='size-4'/> Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products"> Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Cart</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  
  <CartComp cartData={data.numOfCartItems == 0 ? null : data}/>
  </>
}
