import React from 'react'
import ProductCard from './ProductCard';
import { ProductType } from '@/types/type';

const ProductContainer = async ({slice=4} : {slice? :number}) => {
    const response = await fetch("http://localhost:8080/api/products");
    const products = await response.json();
    const featuredProducts = products.slice(0, slice);
    return (

        <div className='bg-green-00  py-2 flex flex-wrap justify-between gap-20 '>
            {featuredProducts.map((product: ProductType, index: number) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    )
}

export default ProductContainer