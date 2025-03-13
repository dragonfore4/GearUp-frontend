"use client";
import { useAuth } from "@/app/context/AuthContext";
import React, { useState } from "react";
import { toast } from "sonner"

const QuantitySelector = ({ productId, stock }: { productId: number, stock: number }) => {
    const { username } = useAuth();
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
                // toast.success("test");
                
                console.log(addToCartData);

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
            <button className="border border-black px-6 py-2 rounded-md font-semibold cursor-pointer hover:bg-black hover:text-white transition-all duration-300" onClick={handleSubmit}>
                Add To Cart
            </button>

            {/* Compare Button */}
            {/* <button className="border border-black px-6 py-2 rounded-md font-semibold">
                + Compare
            </button> */}
        </div>
    );
};

export default QuantitySelector;
