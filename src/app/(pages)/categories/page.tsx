import { HomeIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { CategoryRes } from "@/interfaces/CategoryInterface"


export default async function CategoriesPage() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')

  const data: CategoryRes = await response.json()

  return (
    <div className="container mx-auto">

      {/* Breadcrumb */}
      <Breadcrumb className="my-2 pb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex gap-2 items-center">
              <HomeIcon className="size-4" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Shop by Category
        </h1>
        <p className="text-sm text-slate-500">
          Explore our collections
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {data.data.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group"
          >

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">

              {/* Image */}
            <div className="h-80 md:h-90 overflow-hidden bg-slate-50 dark:bg-slate-800">
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={300}
                className="w-full max-h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

            </div>

              {/* Content */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>

            </div>

          </Link>
        ))}

      </div>
    </div>
  )
}