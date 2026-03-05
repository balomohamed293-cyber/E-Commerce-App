import AllOrdersComp from '@/components/AllOrders/AllOrders'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { HomeIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default async function AllOrders() {

  


  return <>
    <main className="max-w-250 mx-auto px-6 py-10">
  {/* Breadcrumbs */}
    <Breadcrumb className='my-2 pb-2'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className='flex gap-2 items-center'>
          <HomeIcon className='size-4'/> Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Orders</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

      <AllOrdersComp/>
    </main>

  </>
}
