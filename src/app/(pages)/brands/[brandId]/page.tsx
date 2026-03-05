import AddToCart from '@/components/AddToCart/AddToCart';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ProductResponse } from '@/interfaces/productInterface';
import { Heart, HomeIcon, Star, StarHalf } from 'lucide-react';
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import { formatCurrency } from '@/helpers/formatCurrency';
import Image from 'next/image';
import Link from 'next/link';
import ProductDisplay from '@/components/Product/Product';

// https://ecommerce.routemisr.com/api/v1/products?brand=64089fe824b25627a25315d1
export default async function BrandProducts({ params }:{params:Params}) {

    const {brandId} = await params;
    console.log(brandId);

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
    const data : ProductResponse = await response.json()
    console.log(data);
    

  return <>
    <Breadcrumb className='my-2 pb-2'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className='flex gap-2 items-center'>
              <HomeIcon className='size-4'/>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/brands" className='flex gap-2 items-center'>
              Brands
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.data[0]?.brand?.name || "Brand"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>

    {data.data.length !== 0? 
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {data.data.map((product)=> <ProductDisplay product={product} key={product._id} />)}
    </div>
    :
    <div className='flex justify-center items-center'>
        <h2 className='text-3xl'>there is no products at this Sub Category , Products Will Add nearly</h2>
    </div>
}

  </>
}
