import CredentialsProvider from "next-auth/providers/credentials"
import { FailedLogin, SuccessLogin } from "@/interfaces/AuthInterface";
import { AuthOptions } from "next-auth";

export const authOptions : AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { placeholder: 'Enter Your Email', type: 'email' },
                password: { placeholder: 'Example@123', type: 'password' },
            },
            async authorize(credentials) {
                const response = await fetch(
                'https://ecommerce.routemisr.com/api/v1/auth/signin',
                {
                    method: 'POST',
                    body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                }
                )

                if (response.ok) {
                    const data: SuccessLogin = await response.json()

                    return {
                        id : data.user.email,
                        user : data.user,
                        token : data.token
                    }
                    } else {
                    const error: FailedLogin = await response.json()
                    throw new Error(error.message)
                    }
            },
            })
    ],
    pages:{
        signIn:'/login',
        error:'/login'
    },
    secret : process.env.NEXT_AUTH_SECRET ,
    callbacks:{
        async jwt({token , user}){

            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token
        },
        async session({session , token}){

            session.user = token.user;
            session.token = token.token;

            return session 
        }
    }
}