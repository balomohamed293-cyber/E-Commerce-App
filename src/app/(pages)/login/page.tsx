import FormLog from '@/components/FormLog/FormLog'
import Link from 'next/link'
import React from 'react'


export default function Login() {
  return <>
 <main className="flex-1 flex items-center justify-center p-6">
  <div className="w-full max-w-110 bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-8 md:p-10">
    {/* Card Header */}
    <div className="text-center mb-8">
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Welcome back</h1>
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Please enter your details to sign in to your account.</p>
    </div>
    {/* Sign In Form */}
    <FormLog/>
    {/* Footer Link */}
    <div className="mt-10 text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Don't have an account? 
        <Link href={'/register'} className="text-primary font-bold hover:underline"> Create an account</Link>
      </p>
    </div>
  </div>
</main>

  </>
}
