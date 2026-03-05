import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { FailedLogin, SuccessLogin } from "@/interfaces/AuthInterface";
import { authOptions } from "@/auth";


const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}