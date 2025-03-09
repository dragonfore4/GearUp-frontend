"use client";
import React, { use, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext"; // Import AuthContext
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import CartItemPreview from "../cart/CartItemPreview";
import { CartItem } from "@/types/type";

const UserMenu = () => {
    const { token, username, setToken, setUsername } = useAuth(); // Get auth data from context

    const handleLogout = async () => {
        await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        setToken(null);
        setUsername(null);

    };

    return (
        <div className="flex space-x-6 items-center justify-center">
            {!token ? ( // Show Sign In / Sign Up if not logged in
                <ul className="flex space-x-6">
                    <Link href={"/signin"}>
                        <p>Sign In</p>
                    </Link>
                    <div className="w-[1px] bg-gray-400"></div>
                    <Link href={"/signup"}>
                        <p>Sign Up</p>
                    </Link>
                </ul>
            ) : (
                <>
                    {
                        username &&
                        <UserDropdownMenu username={username} handleLogout={handleLogout} />
                    }
                    <CartDropDownMenu username={username} />
                </>
            )}
        </div>
    );
};

export default UserMenu;

// ✅ User Dropdown Menu Component
const UserDropdownMenu = ({ username, handleLogout }: { username: string; handleLogout: () => void }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:ring-0">
                <div className="flex items-center space-x-2">
                    <FaUser />
                    <span className="text-sm">{username}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-md">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <Link href={"/history"}>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <span className="text-red-500">Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const CartDropDownMenu = ({ username }: { username: string | null }) => {

    const [cartDetails, setCartDeatils] = useState([]);

    useEffect(() => {

        if (!username) {
            // console.error("Username is not available.")
            return;
        }

        const fetchCartItems = async () => {
            try {
                const userResponse = await fetch(`http://localhost:8080/api/users/username/${username}`);
                const userData = await userResponse.json();
                // console.log("userIdData: ", userData);

                const cartResponse = await fetch(`http://localhost:8080/api/carts/${userData.id}`);
                const cartData = await cartResponse.json();
                // console.log("cartData: ", cartData);

                const cartDetailResponse = await fetch(`http://localhost:8080/api/cartDetail/${cartData.id}/details`);
                const cartDetailData = await cartDetailResponse.json();
                // console.log("cartDetailData: ", cartDetailData);
                setCartDeatils(cartDetailData);
            } catch (error) {
                console.error("Error occurred while fetching cart items.", error);
            }
        }
        fetchCartItems();
    }, [username])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:ring-0">
                <div className="flex items-center space-x-2">
                    <FaCartShopping />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-md -translate-x-7">
                <DropdownMenuLabel>My Cart</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    cartDetails.map((cartItem: CartItem, index) => (
                        <CartItemPreview key={index} cartItem={cartItem} />
                    ))
                }
                <Link href="/cart">
                    <DropdownMenuItem>Checkout</DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
