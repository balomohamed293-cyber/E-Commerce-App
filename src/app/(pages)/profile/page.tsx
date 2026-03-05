import { getUserAddressesAction } from '@/actions/getUserAddresses.action'
import { authOptions } from '@/auth'
import AddAddress from '@/components/AddAddress/AddAddress'
import LogOut from '@/components/LogOut/LogOut'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import UpdatePassword from '@/components/UpdatePassword/UpdatePassword'
import { HomeIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

export default  async function Profile() {

  
  const session = await getServerSession(authOptions);
  

  
  return <>
  <div className="flex min-h-screen">
    {/* Sidebar Navigation */}
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 h-screen">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-lg md:text-2xl font-bold">
            S
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight">ShopMart</span>
        </div>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-3 overflow-auto">
        <span className="font-medium text-sm md:text-base">
          Go to your <Link href="/allorders" className="cursor-pointer hover:text-blue-400">Orders</Link>
        </span>
        <div className="flex items-center gap-3 p-2 mb-4">
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm md:text-base font-semibold truncate">{session?.user?.name}</span>
            <span className="text-xs md:text-sm text-slate-500 truncate">{session?.user?.email}</span>
          </div>
        </div>
        <Button className="w-full flex bg-transparent items-center justify-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors">
          <LogOut/>
        </Button>
      </nav>
    </aside>

    {/* Main Content Area */}
    <main className="flex-1 overflow-y-auto">
      {/* Header / Breadcrumb */}
      <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
        <Breadcrumb className='my-2 pb-2'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className='flex gap-2 items-center'>
                <HomeIcon className='size-4'/> Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-10 ">
        {/* Profile Section */}
        <div className="mb-3">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">My Profile</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Manage your personal information, addresses, and account security.</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white mb-2 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-center gap-2 shadow-sm">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">{session?.user?.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm md:text-base">{session?.user?.email}</p>
          </div>
        </div>
        <div className="mt-12 p-6 bg-slate-900 rounded-xl text-white flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 overflow-hidden relative">
          <UpdatePassword email={session?.user?.email as string} />
        </div>

        {/* Addresses Section */}
        <AddAddress />

        {/* Security / Update Password Section */}
        
      </div>
    </main>
  </div>
</>
}
