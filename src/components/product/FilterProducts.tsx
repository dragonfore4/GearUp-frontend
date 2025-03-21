"use client";
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'

const FilterProducts = () => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    // console.log(searchParams);
    // console.log(pathname);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        // console.log(params);
        router.push(`${pathname}?${params}`, {
            scroll: false
        });


    }
    return (
        <div className="mt-12 flex justify-between">
            <div className="flex gap-6 flex-wrap">
                <select
                    name="productTypeId"
                    id=""
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                    onChange={handleFilterChange}
                >
                    <option value="0">All Product-Type</option>
                    <option value="1">Laptop & Computer</option>
                    <option value="2">Mobile & Accessories</option>
                    <option value="3">Storage & External Devices</option>
                    <option value="4">Fashion & Accessories</option>
                    <option value="5">Lighting & Home Decor</option>
                </select>
                <input
                    type="text"
                    name="minPrice"
                    placeholder="min price"
                    className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="maxPrice"
                    placeholder="max price"
                    className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
                    onChange={handleFilterChange}
                />

            </div>
            <div>
                <select
                    name="type"
                    id=""
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                >
                    <option>Sort By</option>
                    <option value="Physical">Price (low to high)</option>
                    <option value="Digital">Price (high to low)</option>
                    <option value="Digital">Newest</option>
                    <option value="Digital">Oldest</option>

                </select>

            </div>
        </div>
    )
}

export default FilterProducts