"use client"
import { CartItem } from '@/types/type';
import React, { createContext, useContext, useState } from 'react'

interface CartContextValue {
    cartDetails: CartItem[];
    itemCount: number;
    fetchCart: (userId: number) => Promise<void>;
}

const CartContext = createContext<CartContextValue>({
    cartDetails: [],
    itemCount: 0,
    fetchCart: async () => { },
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartDetails, setCartDetails] = useState<CartItem[]>([]);
    const [itemCount, setItemCount] = useState<number>(0);

    const fetchCart = async (userId: number) => {
        try {
            const cartResponse = await fetch(`http://localhost:8080/api/carts/${userId}`, {
                method: "GET",
                credentials: "include",
            });
            if (!cartResponse.ok) {
                throw new Error("Failed to fetch cart data");
            }
            // const cartdata = await response.json();
            const cartData = await cartResponse.json();


            const cartDetailResponse = await fetch(`http://localhost:8080/api/cartDetail/${cartData.id}/details`, {
                method: "GET",
                credentials: "include",
            });

            if (!cartDetailResponse.ok) {
                throw new Error("Failed to fetch cart detail data");
            }
            const data = await cartDetailResponse.json();
            // console.log(data);
            setCartDetails(data);
            setItemCount(data.length);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }
    console.log(cartDetails)
    return (
        <CartContext.Provider value={{ cartDetails, itemCount, fetchCart }}>
            {children}
        </CartContext.Provider>
    )
}
