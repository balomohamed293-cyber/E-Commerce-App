import React from 'react'
import AddToCart from '../AddToCart/AddToCart'
import { formatCurrency } from '@/helpers/formatCurrency';
import { Heart, Star, StarHalf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces/productInterface';
import AddtoWishList from '../AddtoWishList/AddtoWishList';

export default function ProductDisplay({product} : {product : Product}) {

  return <>
  <div >
        <div className="product-card group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
          <Link href={'/products/'+product.id}>
            <div className="relative h-100 md:h-90 overflow-hidden bg-slate-50 dark:bg-slate-800">
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={300}
                className="w-full max-h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              
            </div>
          </Link>

          <div className="p-5 flex flex-col flex-1">
            <Link href={'/products/'+product.id}>
              <div className="flex items-center gap-1 mb-2">
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

            <span className="text-xs font-bold text-slate-900 dark:text-white">{product.ratingsAverage}</span>
            <span className="text-xs text-slate-400">({product.quantity})</span>
          </div>

            <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{product.brand.name}</p>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 min-h-10">
              {product.title}
            </h3>

            <div className="mt-auto flex items-center justify-between">
              <span className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(product.price)}</span>
            </div>
            </Link>
            <div className="m-2 flex items-center gap-2">
              <AddToCart ProductId={product.id} />
              <AddtoWishList productId={product.id} />
            </div>
          </div>
        </div>
    </div>
  </>
}
