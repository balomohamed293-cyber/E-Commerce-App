import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { BrandRes } from '@/interfaces/Brand';
import { HomeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default async function Brands() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
  const data : BrandRes= await response.json();
  console.log(data);
  

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
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
            <BreadcrumbPage>Brands</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
          Brand Directory
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Discover our curated ecosystem of global designers, luxury fashion houses, and emerging independent labels.
        </p>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-3">
        {data.data.map((brand) => (
          <Link key={brand._id} href={'/brands/'+brand._id}>
          <div className="group relative overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
            
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={brand.image}
                alt={brand.name}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
            </div>

            {/* Brand Name */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                {brand.slug}
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}