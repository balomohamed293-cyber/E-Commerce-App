"use client"
import React, { useEffect, useState } from 'react';
import { RemoveFromWishRes, WishListRes } from '@/interfaces/WishListInterface';
import { getWishlistAction } from '@/actions/wishList.actions';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/helpers/formatCurrency';
import { HomeIcon, Loader2 } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { removeFromWishlistAction } from '@/actions/addToCart.action';
import toast from 'react-hot-toast';
import AddToCart from '@/components/AddToCart/AddToCart';

export default function WishlistComponent() {
    const [wishlist, setWishlist] = useState<WishListRes | null>(null);
    const [loading, setLoading] = useState(true);
    const [removeloading, setRemoveLoading] = useState<string | null>(null);

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const data = await getWishlistAction();
                setWishlist(data);
            } catch (error) {
                console.error("Failed to fetch wishlist", error);
            } finally {
                setLoading(false);
            }
        }
        fetchWishlist();
    }, []);

    async function getWishlist() {
        const data = await getWishlistAction();
        setWishlist(data);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin w-6 h-6 text-primary" />
            </div>
        );
    }
    async function removeFromWishList(productId:string) {
        setRemoveLoading(productId)
        try{
            const data : RemoveFromWishRes  = await removeFromWishlistAction(productId);
            toast.success(data.message + '')
            getWishlist();

        }catch(err){
            console.log(err);
        }
        setRemoveLoading(null)
    }

    if (!wishlist || wishlist.data.length === 0) {
        return <p className="text-center text-slate-500">Your wishlist is empty.</p>;
    }

    return (
        <div>
    <Breadcrumb className='my-2 pb-2'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className='flex gap-2 items-center'><HomeIcon className='size-4'/> Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>My WishList</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {wishlist.data.map(item => (
        <div key={item._id} className="relative bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-md hover:shadow-lg transition-shadow">
            {removeloading === item._id && <div className="absolute inset-0 bg-white/70 flex justify-center items-center rounded-xl">
                <Loader2 className="animate-spin w-6 h-6 text-primary" />
            </div>}
            <span
                onClick={() => removeFromWishList(item._id)}
                className="absolute top-3 right-3 text-red-500 text-xs md:text-sm font-semibold px-2 py-1 rounded-full cursor-pointer shadow-md  transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

            </span>

            <Image
                src={item.imageCover}
                alt={item.title}
                width={300}
                height={300}
                className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                {item.title.slice(0, 15)}{item.title.length > 15 ? '...' : ''}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.brand.name}</p>
            <p className="font-bold mt-1 mb-3">{formatCurrency(item.price)}</p>
            {/* <Link href={`/product/${item._id}`} className="absolute inset-0" /> */}
            <AddToCart ProductId={item._id} />
        </div>
    ))}
</div>
</div>
    );
}