import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { CartItem } from "@/types/type";

const CartItemPreview = ({ cartItem }: { cartItem: CartItem }) => {
    return (
        <div className="flex items-center justify-between space-x-4 p-3 border-b w-fits">
            {/* Product Image */}
            <div className="w-14 h-14 relative">
                <Image
                    src={cartItem.product.imageUrl || "https://placehold.co/100"}
                    alt={cartItem.product.name || "Product Image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>

            {/* Product Details */}
            <div className="">
                <p className="text-sm font-medium truncate w-36 hover:whitespace-normal">{cartItem.product.name}</p>
                <p className="text-xs text-gray-500">x{cartItem.quantity}</p>
                <p className="text-sm font-semibold">${(cartItem.product.price * cartItem.quantity).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartItemPreview;
