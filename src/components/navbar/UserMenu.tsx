"use client";
import React, { useEffect, useState } from "react";
import { FaUser, FaShoppingCart, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CartItem } from "@/types/type";
import CartItemPreview from "../cart/CartItemPreview";
import { useCart } from "@/context/CartContext";

const UserMenu = () => {
    const { token, username, setToken, setUsername } = useAuth();

    const handleLogout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        setToken(null);
        setUsername(null);
    };

    return (
        <div className="flex items-center space-x-4">
            {!token ? (
                <div className="flex space-x-2">
                    <Link href="/signin">
                        <button className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors duration-300">
                            <FaSignInAlt className="text-indigo-600" />
                            <span className="text-sm font-medium">Sign In</span>
                        </button>
                    </Link>
                    <Link href="/signup">
                        <button className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300">
                            <FaUserPlus />
                            <span className="text-sm font-medium">Sign Up</span>
                        </button>
                    </Link>
                </div>
            ) : (
                <>
                    {username && (
                        <UserDropdownMenu username={username} handleLogout={handleLogout} />
                    )}
                    <CartDropDownMenu username={username} />
                </>
            )}
        </div>
    );
};

export default UserMenu;

// User Dropdown Menu Component
const UserDropdownMenu = ({ username, handleLogout }: { username: string; handleLogout: () => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:ring-0">
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-indigo-600 text-white">
                        <FaUser className="text-xs" />
                    </div>
                    <span className="text-sm font-medium">{username}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-lg w-56 border border-gray-100 py-1 mt-1">
                <DropdownMenuLabel className="flex items-center space-x-2 px-4 py-2">
                    <span className="font-semibold text-gray-800">My Account</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                    Profile
                </DropdownMenuItem>
                <Link href="/history">
                    <DropdownMenuItem className="px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                        Billing
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                    Team
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                    Subscription
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer transition-colors duration-200"
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const CartDropDownMenu = ({ username }: { username: string | null }) => {
    const { cartDetails, itemCount, fetchCart } = useCart();

    useEffect(() => {
        const fetchUserIdByUsername = async () => {
            if (username) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/username/${username}`, {
                        method: "GET",
                        credentials: "include",
                    });
                    const data = await response.json();
                    // console.log("User ID: ", data.id);
                    fetchCart(data.id);
                } catch (error) {
                    console.error("Error fetching user ID:", error);
                }
            }
        };
        fetchUserIdByUsername();
    }, [username])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:ring-0">
                <div className="relative flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                    <FaShoppingCart className="text-indigo-600" />
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
                            {itemCount}
                        </span>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-lg border border-gray-100 w-72 py-1 mt-1">
                <DropdownMenuLabel className="flex items-center justify-between px-4 py-2">
                    <span className="font-semibold text-gray-800">My Cart</span>
                    <span className="text-xs font-medium text-gray-500">{itemCount} items</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                <div className="max-h-64 overflow-y-auto py-1">
                    {cartDetails.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                            Your cart is empty
                        </div>
                    ) : (
                        cartDetails.map((cartItem, index) => (
                            <CartItemPreview key={index} cartItem={cartItem} />
                        ))
                    )}
                </div>
                <DropdownMenuSeparator className="bg-gray-100" />
                <Link href="/cart">
                    <DropdownMenuItem className="w-full px-4 py-2 flex justify-center text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors duration-200 my-2 rounded-md mx-auto max-w-[90%]">
                        Checkout
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}