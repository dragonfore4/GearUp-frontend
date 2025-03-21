import React from 'react'
import ProductCard from './ProductCard';
import { ProductType } from '@/types/type';
import Pagination from './Pagination';

const ProductContainer = async ({
    page = 1,
    minPrice = 0,
    maxPrice = 1000000,
    productTypeId = 0,
}: {
    slice?: number,
    limit?: number,
    page?: number,
    minPrice?: number,
    maxPrice?: number,
    productTypeId?: number,
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
    if (productTypeId != 0 && productTypeId != null) {
        query += `&productTypeId=${productTypeId}`;
    }

    console.log(query);
    const response = await fetch("http://localhost:8080/api/products" + query);
    if (!response.ok) {
        return <div className="text-red-500">Failed to load projects</div>;
    }
    const products = await response.json();
    if (products.totalItems === 0) {
        return (<div className="flex flex-col items-center justify-center py-10 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">No products found</h2>
            <p className="text-gray-500">Try searching for something else or browse our categories.</p>
        </div>
        );
    }

    const totalProducts = products.totalItems;
    const totalPages = products.totalPages;
    const displayedProducts = products.products;

    return (

        <div className='mt-12 w-full mb-2'>
            {/* <div className='bg-green-00 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-2  gap-20 bg-green-200'> */}
            <div className='flex gap-x-8 gap-y-16 justify-between flex-wrap w-full'>
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