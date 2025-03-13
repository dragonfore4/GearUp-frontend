"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { CartItem } from "@/types/type";
import CheckoutButton from "@/components/cart/CheckoutButton";

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

    // อัปเดตจำนวนสินค้า
    // อัปเดตจำนวนสินค้าและอัปเดต state หลังจาก API ตอบกลับ
    const updateQuantity = async (cartItemId: number, productId: number, quantity: number, stock: number) => {
        try {

            const currentItem = cartDetails.find(item => item.cart.id === cartItemId && item.product.id === productId);
            if (!currentItem) {
                return;
            }

            const newQuantity = currentItem.quantity + quantity;

            if (newQuantity < 1 || newQuantity > stock) {
                return;
            }

            // ส่งคำขอไปที่ API
            const response = await fetch(`http://localhost:8080/api/cartDetail/${cartItemId}/updateProduct`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId,
                    quantity
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update quantity in database.");
            }

            // ดึงข้อมูล cart ที่อัปเดตจาก response
            const updatedItem = await response.json();

            // ✅ อัปเดต `setCartDetails` โดยใช้ข้อมูลจาก API
            setCartDetails(prevCart =>
                prevCart.map(item => item.cart.id === cartItemId && item.product.id === productId
                    ? { ...item, quantity: updatedItem.quantity } // ใช้ค่าที่ได้จาก API
                    : item
                )
            );

        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };


    // ลบสินค้าออกจากตะกร้า
    const removeItem = async (cartId: number, productId: number) => {
        
        await fetch(`http://localhost:8080/api/cartDetail/${cartId}/removeProduct?productId=${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include"
        });
        setCartDetails(prevCart => prevCart.filter(item => item.product.id !== productId));
    };

    // คำนวณราคารวม
    const totalPrice = cartDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

            {loading ? (
                <p className="text-gray-600">Loading cart...</p>
            ) : cartDetails.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3">Product</th>
                                <th className="py-3">Price</th>
                                <th className="py-3">Quantity</th>
                                <th className="py-3">Total</th>
                                <th className="py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartDetails.map((item) => (
                                <tr key={item.id.sequenceId} className="border-b">
                                    <td className="flex items-center space-x-4 py-4">
                                        <Image src={item.product.imageUrl || "https://placehold.co/100"}
                                            alt={item.product.name} width={50} height={50} />
                                        <span className="font-medium">{item.product.name}</span>
                                    </td>
                                    <td className="py-4">${item.product.price.toFixed(2)}</td>
                                    <td className="py-4">
                                        <button
                                            className="px-2 py-0 border rounded-l bg-gray-100 cursor-pointer"
                                            onClick={() => updateQuantity(item.cart.id, item.product.id, -1, item.product.stock)}
                                        >-</button>
                                        <span className="px-3">{item.quantity}</span>
                                        <button
                                            className="px-2 py-0 border rounded-r bg-gray-100"
                                            onClick={() => updateQuantity(item.cart.id, item.product.id, 1, item.product.stock)}
                                        >+</button>

                                    </td>
                                    <td className="py-4">${(item.product.price * item.quantity).toFixed(2)}</td>
                                    <td className="py-4">
                                        <button
                                            className="text-red-500 hover:text-red-700"
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
                    <div className="flex justify-between mt-6">
                        <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                        <CheckoutButton userId={userId}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;


