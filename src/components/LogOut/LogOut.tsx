"use client"

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function LogOut() {
  return <>
    <Link href={''} className="text-red-600 focus:text-red-700 focus:bg-red-50 dark:text-red-500 dark:focus:bg-red-950 cursor-pointer" onClick={()=>signOut({
                    callbackUrl:'/'
                  })}>Log Out</Link>
  </>
}
