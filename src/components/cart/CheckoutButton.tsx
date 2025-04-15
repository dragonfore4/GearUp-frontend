"use client";
import React, { useState } from 'react';
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
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

const CheckoutButton = ({ userId = 3 }: { userId?: number }) => {
    const { fetchCart } = useCart();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${userId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                toast.success("Checkout successful!");
                await fetchCart(userId); // 🎯 เคลียร์ตะกร้าหลัง checkout
            } else {
                toast.error("Failed to checkout.");
            }
        } catch (error) {
            console.error("Error occurred while checking out.", error);
            toast.error("Checkout failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Checkout"}
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will place your order and clear your cart.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCheckout} disabled={loading}>
                        {loading ? "Please wait..." : "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CheckoutButton;
