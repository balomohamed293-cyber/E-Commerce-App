import {  CreditCardIcon } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return<>
<footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-primary p-1 rounded text-white">
            <span className="material-symbols-outlined text-xl">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Shop Mart</span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 max-w-xs mb-6">
          Your destination for premium, minimalist lifestyle essentials. Curated for the modern professional.
        </p>
        <div className="flex gap-4">
          <a className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all" href="#">
                <span className="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                </svg>
            </span>
          </a>
          <a className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all" href="#">
            <span className="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
            </svg>
            </span>
          </a>
          <a className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all" href="#">
            <span className="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
            </span>
          </a>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6">Shop</h4>
        <ul className="space-y-4 text-sm text-slate-500">
          <li><a className="hover:text-primary transition-colors" href="">Men's Fashion</a></li>
          <li><a className="hover:text-primary transition-colors" href="">Women's Fashion</a></li>
          <li><a className="hover:text-primary transition-colors" href="">Electronics</a></li>
          <li><a className="hover:text-primary transition-colors" href="">Home Goods</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Company</h4>
        <ul className="space-y-4 text-sm text-slate-500">
          <li><a className="hover:text-primary transition-colors" href="">About Us</a></li>
          <li><a className="hover:text-primary transition-colors" href="">Sustainability</a></li>
          <li><a className="hover:text-primary transition-colors" href="">Terms of Service</a></li>
          <li><a className="hover:text-primary transition-colors" href="">Privacy Policy</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Support</h4>
        <ul className="space-y-4 text-sm text-slate-500">
          <li><a className="hover:text-primary transition-colors" href="">Help Center</a></li>
          <li><a className="hover:text-primary transition-colors" href="">Track Order</a></li>
          <li><a className="hover:text-primary transition-colors" href="">Returns &amp; Refunds</a></li>
          <li><a className="hover:text-primary transition-colors" href="">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
      <p>© 2024 ShopMart Inc. All rights reserved.</p>
      <div className="flex items-center gap-6">
        <span className="material-symbols-outlined text-3xl"><CreditCardIcon/></span>
        <span className="material-symbols-outlined text-3xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
        </span>
      </div>
    </div>
  </div>
</footer>

  </>
}
