"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
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
import { addAddressAction, getUserAddressesAction, removeAddressAction } from '@/actions/getUserAddresses.action'
import { AddedAddress, AddressesRes } from '@/interfaces/AddressInterface'
import { Loader2 } from 'lucide-react'

export default function AddAddress() {

    const name = useRef<HTMLInputElement | null>(null);
    const details = useRef<HTMLInputElement | null>(null);
    const phone = useRef<HTMLInputElement | null>(null);
    const city = useRef<HTMLInputElement | null>(null);

    const [addresses, setAddresses] = useState<AddressesRes | null>(null);
    const [open, setOpen] = useState(false);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingGlobal, setLoadingGlobal] = useState(false);
    const [addressID, setAddressID] = useState<string | null>(null);

    async function fetchAddresses() {
        const data = await getUserAddressesAction();
        setAddresses(data || null);
    }

    async function addNewAddress() {
    if (!name.current || !details.current || !phone.current || !city.current) return;
        setLoadingGlobal(true);
    try {
        const newAddress: AddedAddress = {
            name: name.current.value,
            details: details.current.value,
            phone: phone.current.value,
            city: city.current.value
        };
        const savedAddress = await addAddressAction(newAddress);
        setAddresses(savedAddress);
        setOpen(false);
    } catch (error) {
        console.error("Failed to add address:", error);
    } finally {
        setLoadingGlobal(false);
    }
}

    useEffect(() => {
        fetchAddresses();
    }, []);

    
    async function removeAddress(addressId: string) {
        setLoadingId(addressId);
        try {
            const data = await removeAddressAction(addressId);
            setAddresses(data || null);
            if(addressID === addressId) setAddressID(null); 
        } catch (error) {
            console.error("Failed to remove address:", error);
        } finally {
            setLoadingId(null);
        }
    }



    return <>
        

        <div className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold">Saved Addresses</h2>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">Your shipping and billing destinations.</p>
                </div>
            </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors">
                        {loadingGlobal && <Loader2 className="animate-spin w-5 h-5" /> }Add New Address
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                        <DialogDescription>
                        Fill in the address details below.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input ref={name} id="name" name="name" defaultValue="Home" />
                        </Field>
                        <Field>
                            <Label htmlFor="details">Detail</Label>
                            <Input ref={details} id="details" name="details" defaultValue="Home details" />
                        </Field>
                        <Field>
                            <Label htmlFor="phone">Phone</Label>
                            <Input ref={phone} id="phone" name="phone" defaultValue="01010700700" />
                        </Field>
                        <Field>
                            <Label htmlFor="city">City</Label>
                            <Input ref={city} id="city" name="city" defaultValue="Gizaa" />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={addNewAddress}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {addresses && addresses.data.length > 0 ? addresses.data.map((address) => (
            <div key={address._id} className="group relative bg-white dark:bg-slate-900 rounded-xl border-2 border-primary p-6 md:p-8  shadow-md hover:shadow-lg transition-shadow">
                {loadingId === address._id && (
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 flex items-center justify-center z-10 rounded-xl">
                <Loader2 className="animate-spin w-6 h-6 text-primary" />
            </div>
        )}
                <div className="absolute top-4 right-4 flex flex-col gap-3 text-right">
                    <span className="text-sm md:text-base text-slate-400 hover:text-red-500 cursor-pointer transition-colors">
                        <span onClick={()=>removeAddress(address._id)} className="material-symbols-outlined">Remove</span>
                    </span>
                    <span onClick={() => setAddressID(address._id)} className="text-sm md:text-base text-slate-400 hover:text-primary cursor-pointer">Set Default</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    {addressID === address._id && <span className="px-2 py-0.5 bg-primary text-white text-[11px] md:text-xs font-bold rounded uppercase tracking-wider">Default</span>}
                    
                </div>

                <div className="space-y-2 md:space-y-3 text-slate-600 dark:text-slate-400 text-sm md:text-base">
                    <span className="text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-widest">{address.name}</span>
                    <p>City : {address.city}</p>
                    <p>Detail : {address.details}</p>
                    <p>Phone : {address.phone}</p>
                </div>
            </div>
            
        )) : (
            <div className="flex justify-center w-full">
                <p className="text-center text-slate-500 text-sm md:text-base">No addresses found. Please add a new address.</p>
            </div>
        )}
    </div>
    </div>
    </>
}