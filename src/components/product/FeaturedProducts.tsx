import React from 'react'
import ProductCard from './ProductCard';
import { Product, ProductType } from '@/types/type';
import FeaturedProductCard from './FeaturedProductCard';

const PRODUCTS_PER_PAGE = 12;

const FeaturedProducts = async ({
    slice = 6,
}: {
    slice?: number,
}) => {
    let featuredProducts: Product[] = [];
    let baseUrl;
    console.log("=== Enter FeaturedProducts function ===");

    if (typeof window === 'undefined') {
        baseUrl = process.env.API_BASE_URL;
        console.log("Running on server, using:" , baseUrl); // debug
    }
    else {
        // Client-side: เข้าถึงจาก browser
        baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // ควรเป็น http://localhost:8080
        console.log("Running on client, using:", baseUrl);
    }

    try {
        console.log("📦 API_BASE_URL:", baseUrl); // debug
        // const response = await fetch(`${process.env.API_BASE_URL}/api/products`, {
        const response = await fetch(`${baseUrl}/api/products`, {
            method: 'GET',
            next: { revalidate: 60 }, // 60 วินาที
        });

        if (!response.ok) {
            console.error("API responded with an error");
            return (
                <div className="w-full flex justify-center items-center py-16">
                    <div className="text-red-500 bg-red-50 px-6 py-4 rounded-lg border border-red-200 shadow-sm">
                        Failed to load products. Please try again later.
                        <p className="text-xs text-gray-400">API_BASE_URL: {baseUrl}</p>
                    </div>
                </div>
            );
        }

        const products = await response.json();
        const displayedProducts = products.products;
        featuredProducts = displayedProducts.slice(0, slice);

    } catch (error) {
        console.log("=== Enter CATCH block ===");
        console.error("Fetch failed:", error);
        return (
            <div className="w-full flex justify-center items-center py-16">
                <div className="text-red-500 bg-red-50 px-6 py-4 rounded-lg border border-red-200 shadow-sm">
                    Failed to connect to the server. Please try again later.
                    <p className="text-xs text-gray-400">API_BASE_URL: {process.env.API_BASE_URL}</p>
                </div>
            </div>
        );
    }
    // console.log("test: ", featuredProducts);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
            {featuredProducts.map((product: Product, index: number) => (
                <FeaturedProductCard key={index} product={product} />
            ))}
        </div>
    );
}

export default FeaturedProducts;
