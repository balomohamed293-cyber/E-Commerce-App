import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function Home() {
    const session = await getServerSession(authOptions);
  
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-center px-6">
      <div className="absolute inset-0" />

      <div className="relative z-10 space-y-8 max-w-4xl">
        
        {/* Welcome Badge */}
        <span className="inline-block px-6 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full tracking-wide">
          Welcome {session?.user.name} to Shop Mart
        </span>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
          Discover Amazing <span className="text-primary">Deals</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Shop the latest trends with premium quality and unbeatable prices.
          Everything you need in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={'/products'} >
            <Button size="lg" className="rounded-full px-8">
              Shop Now
            </Button>
          </Link>
          <Link href={'/categories'} >
            <Button size="lg" variant={"outline"} className="rounded-full px-8">
              Explore Categories
            </Button>
          </Link>

        </div>

      </div>
    </section>
  )
}