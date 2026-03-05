"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import Credentials from "next-auth/providers/credentials"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  email: z
    .email().nonempty("email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "A valid email has text before @, a domain after it, and an extension of at least two letters."),
  password: z
    .string().nonempty("password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"A valid password must be at least 8 characters long and include uppercase and lowercase letters, plus at least one of numbers and one of special character.")
})

export default function FormLog() {

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('url');
  

    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    const response =await signIn( 'credentials' ,{
        email :data.email,
        password :data.password,
        redirect : true,
        callbackUrl : redirectUrl ? redirectUrl : '/products'
    })
    // console.log(response);
    
    // if(response?.ok){
    //     toast.success("Success Login");
    //     router.push('/products');
    // }else{
    //     toast.error(response?.error!);
    // }
    setLoading(false);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Example@123"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" >
          <Button type="button" variant="outline" className="cursor-pointer" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button disabled={loading} type="submit" form="form-rhf-demo" className="cursor-pointer grow">
            {loading && <Loader2 className="animate-spin"/> }
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
