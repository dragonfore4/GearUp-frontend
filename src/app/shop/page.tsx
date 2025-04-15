import React from 'react'
import Image from 'next/image'
import ProductContainer from '@/components/product/ProductContainer'
import FilterProducts from '@/components/product/FilterProducts';
import { FaShoppingBag } from 'react-icons/fa';

const ShopPage = async (
    // { searchParams }: { searchParams: { limit?: number, page?: number, minPrice?: number, maxPrice?: number, productTypeId?: number } }
    { searchParams }: { searchParams: Promise<{ limit?: number, page?: number, minPrice?: number, maxPrice?: number, productTypeId?: number, sortBy?: string  }> }
) => {
    const { limit, page, minPrice, maxPrice, productTypeId, sortBy } = await searchParams;
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner Section */}
            <div className="relative h-80 w-full overflow-hidden">
                {/* Banner Image */}
                <Image 
                    src="/pictures/banner.png" 
                    alt="Shop Banner" 
                    layout="fill" 
                    objectFit="cover" 
                    className="object-center brightness-75" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/60 to-purple-900/60"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <FaShoppingBag className="text-3xl" />
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Shop</h1>
                    </div>
                    <div className="flex items-center space-x-2 text-lg">
                        <span className="opacity-80">Home</span>
                        <span className="opacity-60">/</span>
                        <span className="font-medium">Shop</span>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <FilterProducts />
                </div>
                
                {/* Products Grid */}
                <ProductContainer 
                    slice={100} 
                    page={page} 
                    minPrice={minPrice} 
                    maxPrice={maxPrice} 
                    productTypeId={productTypeId}
                    sortBy={sortBy}
                />
            </div>
        </div>
    )
}

export default ShopPage