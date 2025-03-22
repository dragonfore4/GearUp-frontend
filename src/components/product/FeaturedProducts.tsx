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

    try {
        const response = await fetch("http://localhost:8080/api/products");

        if (!response.ok) {
            console.error("API responded with an error");
            return (
                <div className="w-full flex justify-center items-center py-16">
                    <div className="text-red-500 bg-red-50 px-6 py-4 rounded-lg border border-red-200 shadow-sm">
                        Failed to load products. Please try again later.
                    </div>
                </div>
            );
        }

        const products = await response.json();
        const displayedProducts = products.products;
        featuredProducts = displayedProducts.slice(0, slice);

    } catch (error) {
        console.error("Fetch failed:", error);
        return (
            <div className="w-full flex justify-center items-center py-16">
                <div className="text-red-500 bg-red-50 px-6 py-4 rounded-lg border border-red-200 shadow-sm">
                    Failed to connect to the server. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
            {featuredProducts.map((product: Product, index: number) => (
                <FeaturedProductCard key={index} product={product} />
            ))}
        </div>
    );
}

export default FeaturedProducts;
