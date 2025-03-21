import React from 'react'
import Image from 'next/image'
import ProductContainer from '@/components/product/ProductContainer'
import FilterProducts from '@/components/product/FilterProducts';

const ShopPage = async (
    { searchParams }: { searchParams: { limit?: number, page?: number, minPrice?: number, maxPrice?:number, productTypeId?: number } }
) => {

    const { limit, page, minPrice, maxPrice, productTypeId } = await searchParams;
    return (
        <div>
            <div className="h-60 relative bg-red-00 flex flex-col justify-center items-center">
                <Image src="/pictures/banner.png" alt="Banner" layout="fill" objectFit="cover" />
                {/* <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-semibold'>Shop</p> */}
                {/* <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-semibold'>home > hsop</p> */}
                <p className='text-6xl font-semibold z-10'>Shop</p>
                <p className='text-xl font-medium mt-4 z-10'>Home &gt; <span className='font-normal'>Shop</span></p>
            </div>
            <div className='containerbox bg-red-00'>
                <FilterProducts />
                <ProductContainer slice={100} page={page} minPrice={minPrice} maxPrice={maxPrice} productTypeId={productTypeId} />
            </div>
        </div>
    )
}

export default ShopPage