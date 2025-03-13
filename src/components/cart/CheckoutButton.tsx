"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'

const CheckoutButton = ({ userId = 3 }: { userId?: number }) => {

    const handleCheckout = async () => {
        console.log(userId);
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                toast.success("Checkout successful!");
                window.location.reload();
            } else {
                toast.error("Failed to checkout.");
            }
        } catch (error) {
            console.error("Error occurred while checking out.", error);
            toast.error("Failed to checkout.");
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700'>Checkout</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will checkout your orders item in your cart.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCheckout}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CheckoutButton