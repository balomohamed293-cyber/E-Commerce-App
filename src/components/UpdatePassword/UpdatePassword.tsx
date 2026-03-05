"use client"
import React, { useRef, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { updatePasswordAction } from '@/actions/updatePassword.action'
import toast from 'react-hot-toast'
import { FailedRes } from './../../interfaces/UpdatePasswordInterface';
import { SuccessRes } from '@/interfaces/UpdatePasswordInterface'
import { Loader2 } from 'lucide-react'
import { signIn, signOut } from 'next-auth/react'
import { log } from 'node:console'


export default function UpdatePassword({email} : {email : string}) {

    const [loading, setLoading] = useState(false)
    const currentPassword = useRef<null | HTMLInputElement>(null)
    const newPassword = useRef<null | HTMLInputElement>(null)
    const rePassword = useRef<null | HTMLInputElement>(null)
    


    async function updatePasswordHandler(){
        setLoading(true);
            const payload  = {
                currentPassword : currentPassword?.current?.value as string ,
                password : newPassword?.current?.value as string,
                rePassword : rePassword?.current?.value as string 
            }
                if (payload.password !== payload.rePassword) {
                    toast.error("Passwords do not match");
                    setLoading(false);
                    return;
                }
            const response : FailedRes | SuccessRes = await updatePasswordAction(payload);
            console.log(response);
                if (response.message === "success") {
                    toast.success("Password Updated Successfully");
                    await signIn("credentials", {
                        redirect: false,
                        email: email,
                        password: payload.password,
                    });
                    // await signOut({ callbackUrl: "/login" });
                }else{
                    toast.error((response as FailedRes)?.errors?.msg || "Update failed");
                }
        setLoading(false);
    }

    return <>
    <Dialog>
        <DialogTrigger asChild>
            <Button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                Update Password
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
            <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
                Make changes to your password here. Click save when you&apos;re
                done.
            </DialogDescription>
            </DialogHeader>
            <FieldGroup>
            <Field>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input ref={currentPassword} id="currentPassword" name="currentPassword" type="password" defaultValue="Example@123" />
            </Field>
            <Field>
                <Label htmlFor="newPassword">New Password</Label>
                <Input ref={newPassword} id="newPassword" name="newPassword" type="password" defaultValue="Example@123456" />
            </Field>
            <Field>
                <Label htmlFor="rePassword">Re-enter New Password</Label>
                <Input ref={rePassword} id="rePassword" name="rePassword" type="password" defaultValue="Example@123456" />
            </Field>
            </FieldGroup>
            <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={updatePasswordHandler} type="button" disabled={loading}>{loading && <Loader2 className="animate-spin mr-2"/>} Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
}
