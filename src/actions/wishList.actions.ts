"use server"

import { authOptions } from "@/auth";
import { WishListRes } from "@/interfaces/WishListInterface";
import { getServerSession } from "next-auth";

export async function getWishlistAction(): Promise<WishListRes | null> {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
            token: session.token
        },
        cache: "no-store" // مهم عشان تجيب آخر البيانات مباشرة
    });

    if (!response.ok) {
        console.error("Failed to fetch wishlist:", response.status);
        return null;
    }

    const data: WishListRes = await response.json();
    return data;
}

