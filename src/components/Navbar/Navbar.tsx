import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"



import Link from 'next/link'
import { ShoppingCartIcon, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import LogOut from "../LogOut/LogOut"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import CartIcon from "../CartIcon/CartIcon"
import { CartRes } from "@/interfaces/CartInterface"

export default async function Navbar() {

  const session = await getServerSession(authOptions);
  let data : CartRes | null  = null
  if(session){
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
    headers:{
      token : session?.token as string
    }
  })
    data = await response.json()
  }
  
  return (
    <nav className="p-4 shadow-md ">
      <div className="container mx-auto flex items-center justify-between text-xl font-semibold">
        
        {/* Logo */}
        <h2 className="font-bold flex gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
          <Link href="/">ShopMart</Link>
        </h2>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <User className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                {session ? <>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem><Link href={'profile'}>Profile</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'allorders'}>My Orders</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'wishlist'}>My Wishlist</Link></DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50 dark:text-red-500 dark:focus:bg-red-950 cursor-pointer" >
                    <LogOut/>
                </DropdownMenuItem>
                </> 
                :
                <>
                <Link href={'login'} ><DropdownMenuItem className="cursor-pointer">Log In</DropdownMenuItem></Link>
                <Link href={'register'} ><DropdownMenuItem className="cursor-pointer">Register</DropdownMenuItem></Link>
                </>}
                
                </DropdownMenuGroup>
                
            </DropdownMenuContent>
            </DropdownMenu>

          {session&& data && <CartIcon numOfCartItems = {data?.numOfCartItems ?? 0} cartOwner={data.data.cartOwner} />}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className='cursor-pointer' />
            </SheetTrigger>

            <SheetContent side="left" className="w-72 p-6">
                <div className="flex flex-col gap-6">

                    {/* Logo */}
                    <h2 className="text-2xl font-bold border-b pb-4">
                    <Link href={'/'}>ShopMart</Link>
                    </h2>

                    {/* Navigation */}
                    <div className="flex flex-col gap-3 text-lg font-medium">
                    <Link className="hover:text-primary transition" href="/products">
                        Products
                    </Link>
                    <Link className="hover:text-primary transition" href="/brands">
                        Brands
                    </Link>
                    <Link className="hover:text-primary transition" href="/categories">
                        Categories
                    </Link>
                    </div>

                    <div className="border-t pt-4" />

                    {/* Account */}
                    <div className="flex flex-col gap-3 text-base">
                    {session? <>
                      <Link className="hover:text-primary transition" href="/profile">
                          Profile
                      </Link>
                      <Link className="hover:text-primary transition" href="/allorders">
                          My Orders
                      </Link>
                      <Link className="hover:text-primary transition" href="/cart">
                          Cart
                      </Link>
                      <Link className="hover:text-primary transition" href="/wishlist">
                          Wishlist
                      </Link>
                      <LogOut/>
                    </> : <div className="flex flex-col gap-3">
                      <Link className="hover:text-primary transition" href="/login">
                          Login
                      </Link>
                      <Link className="hover:text-primary transition" href="/register">
                          Register
                      </Link>
                    </div>}
                    
                    </div>

                    <div className="border-t pt-4" />

                    {/* Auth */}
                    <>
                    
                    
                    </>

                </div>
                </SheetContent>

          </Sheet>
        </div>

      </div>
    </nav>
  )
}

