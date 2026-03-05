import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button'
import { Product } from '@/interfaces/productInterface';
import { CheckCircle, Heart, HomeIcon, Star, StarHalf, TruckIcon } from 'lucide-react';
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image';
import React from 'react'
import Slider from './../../../../components/Slider/Slider';
import ProductImage from './../../../../components/ProductImage/ProductImage';
import AddToCart from '@/components/AddToCart/AddToCart';
import { formatCurrency } from '@/helpers/formatCurrency';


export default async function ProductDetails({ params }:{params:Params}) {

    const {productId} = await params;
    
    const response = await fetch(`${process.env.BASE_URL}/products/` + productId);
    const res = await response.json(); // res: { data: Product }
    const product: Product = res.data;


  return <>
  <Breadcrumb className='my-2 pb-2'>
    <BreadcrumbList>
      <BreadcrumbItem>
          <BreadcrumbLink href="/" className='flex gap-2 items-center'><HomeIcon className='size-4'/> Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{product.brand.name}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-2 mt-4">

  {/* الصور الرئيسية + thumbnails */}
  <ProductImage images={product.images} title={product.title}/>

  {/* Product Info */}
  <div className="flex flex-col">
    <div className="mb-6">
      <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">{product.brand.name}</p>
      <h2 className="text-4xl font-bold text-zinc-900 dark:text-white leading-tight mb-4">
        {product.title}
      </h2>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => {
              const rating = product.ratingsAverage
              if (i + 1 <= Math.floor(rating)) {
                return <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              } else if (i + 0.5 <= rating) {
                return <StarHalf key={i} className="w-4 h-4 text-amber-200 fill-amber-200" />
              } else {
                return <Star key={i} className="w-4 h-4 text-slate-200 dark:text-slate-700" />
              }
            })}
          <span className="ml-2 text-sm font-semibold text-zinc-900 dark:text-white">{product.ratingsAverage}</span>
        </div>
      </div>
    </div>

    {/* Price */}
    <div className="mb-8">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-zinc-900 dark:text-white">{formatCurrency(product.price)}</span>
        {/* <span className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold px-2 py-1 rounded-md ml-2">SAVE 15%</span> */}
      </div>
      <p className="text-zinc-500 text-sm mt-1">Tax included. Shipping calculated at checkout.</p>
    </div>

    {/* About & Details */}
    <div className="space-y-6 mb-10">
      <div>
        <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3">About this product</h4>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
          {product.description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 py-6 border-y border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          {product.quantity > 1 && <span className="material-symbols-outlined text-zinc-400"><CheckCircle/></span>}
          <span className="text-sm text-zinc-600 dark:text-zinc-400">In Stock</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-zinc-400"><TruckIcon/></span>
          <span className="text-green-600 font-bold uppercase text-xs">Calculated At CheckOut</span>
        </div>
      </div>
    </div>

    {/* Quantity + Buttons */}
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">


        {/* Add to Cart */}
        <AddToCart ProductId={product.id}/>

        {/* Favorite */}
        <Heart className="size-7 cursor-pointer text-slate-400 hover:text-red-500 hover:fill-red-500 transition-colors duration-200" />
      </div>
    </div>
  </div>
</div>



  </>
}
