"use client";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import React, { useState } from "react";
import { toast } from "sonner"

const QuantitySelector = ({ productId, stock }: { productId: string, stock: number }) => {
    const { username } = useAuth();
    const { fetchCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleSubmit = async () => {
        try {
            console.log(username);
            if (!username) {
                toast.error(
                    <div>
                        <div>Error</div>
                        <p>Login first</p>
                    </div>
                );
                return;
            }

            const userResponse = await fetch(`http://localhost:8080/api/users/username/${username}`);
            const userData = await userResponse.json();

            const cartResponse = await fetch(`http://localhost:8080/api/carts/${userData.id}`);
            const cartData = await cartResponse.json();

            if (quantity > stock) {
                toast.error("Quantity exceeds stock");
                return;
            }
            const addToCartResponse = await fetch(`http://localhost:8080/api/cartDetail/${cartData.id}/addProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: quantity,
                })
            });

            if (addToCartResponse.ok) {
                const addToCartData = await addToCartResponse.json();
                toast.success("Product added to cart");
                await fetchCart(userData.id); // Fetch the updated cart details
                // toast.success("test");
                // console.log(addToCartData);

            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center space-x-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-400 rounded-md px-3 py-2">
                <button onClick={handleDecrease} className="px-2 text-lg cursor-pointer">-</button>
                <span className="px-4">{quantity}</span>
                <button onClick={handleIncrease} className="px-2 text-lg cursor-pointer">+</button>
            </div>

            {/* Add to Cart Button */}
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition duration-300 hover:scale-105" onClick={handleSubmit}>
                Add to Cart
            </button>

            {/* Compare Button */}
            {/* <button className="border border-black px-6 py-2 rounded-md font-semibold">
                + Compare
            </button> */}
        </div>
    );
};

export default QuantitySelector;
