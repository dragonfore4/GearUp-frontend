import React from 'react'
import ProductCard from './ProductCard';
import { ProductType } from '@/types/type';
import Pagination from './Pagination';

const ProductContainer = async ({
    page = 1,
    minPrice = 0,
    maxPrice = 1000000
}: {
    slice?: number,
    limit?: number,
    page?: number,
    minPrice?: number,
    maxPrice?: number,
}) => {
    let query = "";
    if (page) {
        query += `?page=${page - 1}`;
    }
    if (minPrice) {
        query += `&minPrice=${minPrice}`;
    }
    if (maxPrice) {
        query += `&maxPrice=${maxPrice}`;
    }

    const response = await fetch("http://localhost:8080/api/products" + query);
    if (!response.ok) {
        return <div className="text-red-500">Failed to load projects</div>;
    }
    const products = await response.json();
    if (products.totalItems === 0) {
        return <div className="text-red-500">No products found</div>;
    }
    console.log(products);
    // console.log(minPrice);

    const totalProducts = products.totalItems;
    const totalPages = products.totalPages;
    const displayedProducts = products.products;

    return (

        <div>
            {/* <div className='bg-green-00  py-2 flex flex-wrap justify-between gap-20 '> */}
            <div className='bg-green-00 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-2  gap-20 '>
                {displayedProducts.map((product: ProductType, index: number) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
            {/* แสดง Pagination ด้านล่าง */}
            <Pagination currentPage={page} totalPages={totalPages} />
        </div>
    )
}

export default ProductContainer