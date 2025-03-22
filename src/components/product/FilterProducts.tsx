// "use client";
// import { usePathname, useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import React from 'react'

// const FilterProducts = () => {

//     const pathname = usePathname();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     // console.log(searchParams);
//     // console.log(pathname);

//     const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         const params = new URLSearchParams(searchParams);
//         params.set(name, value);
//         // console.log(params);
//         router.push(`${pathname}?${params}`, {
//             scroll: false
//         });


//     }
//     return (
//         <div className="mt-12 flex justify-between">
//             <div className="flex gap-6 flex-wrap">
//                 <select
//                     name="productTypeId"
//                     id=""
//                     className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
//                     onChange={handleFilterChange}
//                 >
//                     <option value="0">All Product-Type</option>
//                     <option value="1">Laptop & Computer</option>
//                     <option value="2">Mobile & Accessories</option>
//                     <option value="3">Storage & External Devices</option>
//                     <option value="4">Fashion & Accessories</option>
//                     <option value="5">Lighting & Home Decor</option>
//                 </select>
//                 <input
//                     type="text"
//                     name="minPrice"
//                     placeholder="min price"
//                     className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
//                     onChange={handleFilterChange}
//                 />
//                 <input
//                     type="text"
//                     name="maxPrice"
//                     placeholder="max price"
//                     className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
//                     onChange={handleFilterChange}
//                 />

//             </div>
//             <div>
//                 <select
//                     name="type"
//                     id=""
//                     className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
//                 >
//                     <option>Sort By</option>
//                     <option value="Physical">Price (low to high)</option>
//                     <option value="Digital">Price (high to low)</option>
//                     <option value="Digital">Newest</option>
//                     <option value="Digital">Oldest</option>

//                 </select>

//             </div>
//         </div>
//     )
// }

// export default FilterProducts

"use client";
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaTags, FaDollarSign } from 'react-icons/fa';
import { MdOutlinePriceChange } from 'react-icons/md';

const FilterProducts = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const [activeFilters, setActiveFilters] = useState({
        productTypeId: searchParams.get('productTypeId') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        sortBy: searchParams.get('sortBy') || ''
    });

    // Handle form input changes
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams);
        
        // Update URL parameters
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        
        // Update active filters state
        setActiveFilters(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Navigate with new params
        router.push(`${pathname}?${params}`, {
            scroll: false
        });
    };

    // Clear all filters
    const clearAllFilters = () => {
        setActiveFilters({
            productTypeId: '',
            minPrice: '',
            maxPrice: '',
            sortBy: ''
        });
        
        router.push(pathname, {
            scroll: false
        });
    };
    
    return (
        <div className="space-y-6">
            {/* Filter Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaFilter className="text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Filter Products</h2>
                </div>
                
                {/* Clear Filters Button - Only show when there are active filters */}
                {(activeFilters.productTypeId || activeFilters.minPrice || activeFilters.maxPrice) && (
                    <button 
                        onClick={clearAllFilters}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Product Type Filter */}
                <div className="flex flex-col space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FaTags className="text-indigo-500" />
                        Product Category
                    </label>
                    <select
                        name="productTypeId"
                        value={activeFilters.productTypeId}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                        <option value="">All Categories</option>
                        <option value="1">Laptop & Computer</option>
                        <option value="2">Mobile & Accessories</option>
                        <option value="3">Storage & External Devices</option>
                        <option value="4">Fashion & Accessories</option>
                        <option value="5">Lighting & Home Decor</option>
                    </select>
                </div>
                
                {/* Price Range Filters */}
                <div className="flex flex-col space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <MdOutlinePriceChange className="text-indigo-500" />
                        Price Range
                    </label>
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 text-sm">$</span>
                            </div>
                            <input
                                type="number"
                                name="minPrice"
                                placeholder="Min"
                                value={activeFilters.minPrice}
                                onChange={handleFilterChange}
                                className="pl-7 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            />
                        </div>
                        <span className="text-gray-400">-</span>
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 text-sm">$</span>
                            </div>
                            <input
                                type="number"
                                name="maxPrice"
                                placeholder="Max"
                                value={activeFilters.maxPrice}
                                onChange={handleFilterChange}
                                className="pl-7 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Sorting Options */}
                <div className="flex flex-col space-y-2 md:col-span-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FaSort className="text-indigo-500" />
                        Sort By
                    </label>
                    <select
                        name="sortBy"
                        value={activeFilters.sortBy}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                        <option value="">Featured</option>
                        <option value="price_asc">Price (Low to High)</option>
                        <option value="price_desc">Price (High to Low)</option>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
                
                {/* Search Box (Optional) */}
                <div className="flex flex-col space-y-2 md:col-span-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FaSearch className="text-indigo-500" />
                        Search Products
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search by keyword..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Active Filters Display */}
            {(activeFilters.productTypeId || activeFilters.minPrice || activeFilters.maxPrice) && (
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                    
                    {activeFilters.productTypeId && (
                        <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center">
                            Category: {getProductTypeName(activeFilters.productTypeId)}
                            <button 
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams);
                                    params.delete('productTypeId');
                                    setActiveFilters(prev => ({ ...prev, productTypeId: '' }));
                                    router.push(`${pathname}?${params}`, { scroll: false });
                                }}
                                className="ml-2 text-indigo-500 hover:text-indigo-700"
                            >
                                ×
                            </button>
                        </div>
                    )}
                    
                    {(activeFilters.minPrice || activeFilters.maxPrice) && (
                        <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center">
                            Price: 
                            {activeFilters.minPrice ? ` $${activeFilters.minPrice}` : ' $0'} 
                            {' - '} 
                            {activeFilters.maxPrice ? `$${activeFilters.maxPrice}` : 'Any'}
                            <button 
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams);
                                    params.delete('minPrice');
                                    params.delete('maxPrice');
                                    setActiveFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
                                    router.push(`${pathname}?${params}`, { scroll: false });
                                }}
                                className="ml-2 text-indigo-500 hover:text-indigo-700"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Helper function to get product type name from ID
const getProductTypeName = (id: string) => {
    const types = {
        '1': 'Laptop & Computer',
        '2': 'Mobile & Accessories',
        '3': 'Storage & External Devices',
        '4': 'Fashion & Accessories',
        '5': 'Lighting & Home Decor'
    };
    
    return types[id as keyof typeof types] || 'Unknown';
};

export default FilterProducts;