"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { CartItem } from "@/types/type";
import CheckoutButton from "@/components/cart/CheckoutButton";
import { useAuth } from "@/context/AuthContext";

const CartPage = () => {
    const { token, username } = useAuth();
    const [loading, setLoading] = useState(true);
    const [cartDetails, setCartDetails] = useState<CartItem[]>([]);
    const [userId, setUserId] = useState<number>(0);

    useEffect(() => {
        if (!username) return;

        const fetchCartItems = async () => {
            try {
                const userResponse = await fetch(`http://localhost:8080/api/users/username/${username}`, {
                    method: "GET",
                    credentials: "include"
                });
                const userData = await userResponse.json();

                const cartResponse = await fetch(`http://localhost:8080/api/carts/${userData.id}`);
                const cartData = await cartResponse.json();

                const cartDetailResponse = await fetch(`http://localhost:8080/api/cartDetail/${cartData.id}/details`);
                const cartDetailData = await cartDetailResponse.json();

                setCartDetails(cartDetailData);
                setUserId(userData.id);
            } catch (error) {
                console.error("Error occurred while fetching cart items.", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [username]);

    const updateQuantity = async (cartItemId: number, productId: number, quantity: number, stock: number) => {
        try {
            const currentItem = cartDetails.find(item => item.cart.id === cartItemId && item.product.id === productId);
            if (!currentItem) return;

            const newQuantity = currentItem.quantity + quantity;
            if (newQuantity < 1 || newQuantity > stock) return;

            const response = await fetch(`http://localhost:8080/api/cartDetail/${cartItemId}/updateProduct`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId, quantity }),
            });

            if (!response.ok) throw new Error("Failed to update quantity.");
            const updatedItem = await response.json();

            setCartDetails(prev =>
                prev.map(item =>
                    item.cart.id === cartItemId && item.product.id === productId
                        ? { ...item, quantity: updatedItem.quantity }
                        : item
                )
            );
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const removeItem = async (cartId: number, productId: number) => {
        await fetch(`http://localhost:8080/api/cartDetail/${cartId}/removeProduct?productId=${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include"
        });

        setCartDetails(prev => prev.filter(item => item.product.id !== productId));
    };

    const totalPrice = cartDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Shopping Cart</h1>

            {loading ? (
                <p className="text-gray-600">Loading cart...</p>
            ) : cartDetails.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-xl shadow-md">
                    <p className="text-lg text-gray-500">Your cart is empty.</p>
                    <Link href="/shop" className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wide">
                                <th className="py-4">Product</th>
                                <th className="py-4">Price</th>
                                <th className="py-4">Quantity</th>
                                <th className="py-4">Total</th>
                                <th className="py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm md:text-base">
                            {cartDetails.map((item) => (
                                <tr key={item.id.sequenceId} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="flex items-center gap-4 py-4">
                                        <Image
                                            src={item.product.imageUrl || "https://placehold.co/100"}
                                            alt={item.product.name}
                                            width={60}
                                            height={60}
                                            className="rounded-lg object-cover"
                                        />
                                        <span className="font-medium">{item.product.name}</span>
                                    </td>
                                    <td className="py-4">${item.product.price.toFixed(2)}</td>
                                    <td className="py-4">
                                        <div className="inline-flex items-center rounded-md overflow-hidden border border-gray-300 shadow-sm">
                                            <button
                                                className="px-3 py-1 text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                                                onClick={() => updateQuantity(item.cart.id, item.product.id, -1, item.product.stock)}
                                            >-</button>
                                            <span className="px-4">{item.quantity}</span>
                                            <button
                                                className="px-3 py-1 text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                                                onClick={() => updateQuantity(item.cart.id, item.product.id, 1, item.product.stock)}
                                            >+</button>
                                        </div>
                                    </td>
                                    <td className="py-4">${(item.product.price * item.quantity).toFixed(2)}</td>
                                    <td className="py-4">
                                        <button
                                            className="text-red-500 hover:text-red-700 transition"
                                            onClick={() => removeItem(item.cart.id, item.product.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Total & Checkout */}
                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-lg font-semibold text-gray-800">
                            Total: <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
                        </p>
                        <CheckoutButton userId={userId} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;


