import { Button } from '@/components/ui/button'
import { ProductResponse } from '@/interfaces/productInterface';
import { Heart, HomeIcon, Star, StarHalf } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import AddToCart from '@/components/AddToCart/AddToCart';
import { formatCurrency } from '@/helpers/formatCurrency';
import ProductDisplay from '@/components/Product/Product';

export default async function Products() {

  const response = await fetch(`${process.env.BASE_URL}/products`);
  const data : ProductResponse = await response.json()

  return <div className='container mx-auto'>
    <Breadcrumb className='my-2 pb-2'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className='flex gap-2 items-center'><HomeIcon className='size-4'/> Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Products</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {data.data.map((product)=> <ProductDisplay product={product} key={product._id} />)}
    </div>
  </div>
}
