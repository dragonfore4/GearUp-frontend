import React from 'react'
import ProductCard from './ProductCard';
import { ProductType } from '@/types/type';

const PRODUCTS_PER_PAGE = 12;

const FeaturedProducts = async ({
    slice = 3,
}: {
    slice?: number,
}) => {
    const response = await fetch("http://localhost:8080/api/products");
    if (!response.ok) {
        return <div className="text-red-500">Failed to load projects</div>;
    }
    const products = await response.json();

    const displayedProducts = products.products;

    const featuredProducts = displayedProducts.slice(0, slice);
    return (

        <div className='bg-green-00  py-2 flex flex-wrap justify-between gap-20 '>
            {featuredProducts && featuredProducts.map((product: ProductType, index: number) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    )
}

export default FeaturedProducts