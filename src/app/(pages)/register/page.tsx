import FormLog from '@/components/FormLog/FormLog'
import RegisterForm from '@/components/RegisterForm/RegisterForm'
import Link from 'next/link'
import React from 'react'

export default function Register() {
  return (
  <>
    <main className="flex-1 flex items-center justify-center p-6">
      <div className="relative w-full max-w-110 bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">

        {/* Decorative Background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />
        <div className="absolute -right-8 -top-8 size-32 bg-primary/10 rounded-full blur-2xl" />

        {/* Header Section */}
        <div className="relative z-10 px-8 pt-10 pb-6">
          <h1 className="text-2xl font-bold text-[#111318] dark:text-white">
            Create New Account
          </h1>
          <p className="text-[#606e8a] dark:text-slate-400 text-sm mt-1">
            Join our community today to start shopping.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800" />

        {/* Form Section */}
        <div className="relative z-10 px-8 py-8">
          <RegisterForm/>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account?
              <Link
                href="/login"
                className="text-primary font-bold hover:underline ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  </>
)
}
