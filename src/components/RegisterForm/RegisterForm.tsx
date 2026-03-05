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
import { schema } from "../RegisterSchema"
import registerAction from "@/actions/register.action"
import { SuccessRes } from "@/interfaces/RegisterData"
import { FailedRes } from './../../interfaces/RegisterData';

const formSchema = schema

export default function RegisterForm() {


    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name : "",
        email: "",
        password: "",
        rePassword: "",
        phone:""
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);

    const response : SuccessRes | FailedRes = await registerAction(data);
    console.log(response);
    if(response?.message == "success"){
        toast.success("Success Register");
        router.push('/login');
    }else{
        toast.error(response?.message);
    }

    setLoading(false);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    RePassword
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
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Phone Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="ex: 01*********"
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
            Register Account
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
