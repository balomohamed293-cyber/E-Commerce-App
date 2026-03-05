import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button';
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
import { cashOrderAction, checkOutAction } from '@/actions/cartActions';
import { ShippingAddress } from '@/interfaces/CartInterface';
import { CheckOutRes } from '@/interfaces/CheckOut';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckOut({cartId  , setCart} : {cartId : string,  setCart: (cart: any) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState('')
    const city = useRef<null | HTMLInputElement>(null);
    const details = useRef<null | HTMLInputElement>(null);
    const phone = useRef<null | HTMLInputElement>(null);

    async function checkOut(){
        setLoading('checkout');
        const shippingAddress : ShippingAddress = {
            city : city?.current?.value as string ,
            details : details?.current?.value as string,
            phone : phone?.current?.value as string 
        }
        const response : CheckOutRes = await checkOutAction(cartId , shippingAddress);
        if(response.status == 'success'){
            location.href = response.session.url;
        }
        setLoading('');
    }
    async function cashOrder(){
        setLoading('cash');
        const shippingAddress : ShippingAddress = {
            city : city?.current?.value as string ,
            details : details?.current?.value as string,
            phone : phone?.current?.value as string 
        }
        const response : CheckOutRes = await cashOrderAction(cartId , shippingAddress);
        if(response.status == 'success'){
            window.dispatchEvent(
              new CustomEvent('cartItems', { detail: 0 })
            )
            toast.success("Cash Done Successfully")
            setCart(null)
            setIsOpen(false);
        }
        setLoading('');
    }

  return <>

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger  asChild>
            <Button onClick={() => setIsOpen(true)}
            className="w-full bg-primary text-white rounded-xl py-4 font-black text-lg shadow-lg">
                Checkout Now
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
              Please Enter your Shipping Address
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="city">City</Label>
              <Input ref={city} id="city" name="city" defaultValue="Cairo" />
            </Field>
            <Field>
              <Label htmlFor="details">Details</Label>
              <Input ref={details} id="details" name="details" defaultValue="Shubra" />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phone} id="phone" name="phone" defaultValue="01022447799" />
            </Field>
            
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <div className='flex flex-col gap-4 '>
                <Button onClick={checkOut} type="submit" disabled={loading === 'checkout'} >
                    {loading === 'checkout' && <Loader2 className='animate-spin'/>}
                    Check Out</Button>
                <Button onClick={cashOrder} type="submit" disabled={loading === 'cash'} >
                    {loading === 'cash' && <Loader2 className='animate-spin'/>}
                    Cash Order</Button>
            </div>
          </DialogFooter>
        </DialogContent>
    </Dialog>
    
  </>
}
