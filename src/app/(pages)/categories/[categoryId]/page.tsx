import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { ArrowRight, HomeIcon } from 'lucide-react'
import React from 'react'
import { Params } from 'next/dist/server/request/params';
import { SubCategoryRes } from '@/interfaces/SubCategoryInterface';
import Link from 'next/link';

export default async function SubCategory({ params }:{params:Params}) {

    const {categoryId} = await params;

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
    const data : SubCategoryRes = await response.json();

    // console.log(data);
    
    // console.log(categoryId , data.data);
    

  return <>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Breadcrumb */}
      <Breadcrumb className="my-2 pb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex gap-2 items-center">
              <HomeIcon className="size-4" />
              Home
            </BreadcrumbLink>
          <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories" className="flex gap-2 items-center">
              categories
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Sub Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

  {/* Header Section */}
  <div className="mb-10">
    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-3">Shop by SubCategory</h1>
    <p className="text-lg text-slate-500 dark:text-zinc-400">Explore our curated collection of specialized product ranges.</p>
  </div>
  {/* Directory Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Card 1 */}
    {data.data.map((subCategory)=>
    <div key={subCategory._id} className="group card-hover relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="flex flex-col h-full">
        {/* <div className="h-80 md:h-90 overflow-hidden bg-slate-50 dark:bg-slate-800">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={300}
                        height={300}
                        className="w-full max-h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
        
                    </div> */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="card-title text-xl font-bold transition-colors">{subCategory.name}</h3>
            
          </div>
          <p className="text-sm text-slate-500 dark:text-zinc-500 font-mono break-all">{subCategory.slug}</p>
        </div>
        <Link href={`/categories/${categoryId}/${subCategory._id}`}>
        <div className="mt-6 flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all w-fit hover:text-blue-400" >
            Continue Shopping <ArrowRight className='size-5'/>
          </span>
        </div>
        </Link>
      </div>
    </div>)}
    
  </div>
  
</main>

  </>
}
