import QuantitySelector from '@/components/product/QuantitySelector';
import { ProductType } from '@/types/type';
import Image from 'next/image';
import React from 'react'

const page = async (
    { params }: { params: { id: number } }) => {

    const { id } = await params;

    const productResponse = await fetch(`http://localhost:8080/api/products/${id}`)
    const product: ProductType = await productResponse.json();

    return (
        <div>
            {/* Breadcrumb container */}
            <div className="bg-[#f9f1e7] py-4 px-20 rounded-lg flex items-center gap-2 text-sm text-gray-500">
                <span className="cursor-pointer hover:text-gray-700">Home</span>
                <span className="text-gray-700"> &gt; </span>
                <span className="cursor-pointer hover:text-gray-700">Shop</span>
                <span className="text-gray-700"> &gt; </span>
                <span className="text-black font-medium">{id ? product.name : "Product Detail"}</span>
            </div>
            {/* Product or content section */}
            <div className='containerbox flex flex-col md:flex-row  bg-blue-0 mt-12'>
                {/* LEFT SIDE */}
                {/* <div className='bg-red-00 lg:h-[350px] w-1/3 relative w-full'> */}
                <div className='relative w-full md:w-1/3 h-[400px] shadow-lg rounded-lg overflow-hidden'>
                    <Image src={product.imageUrl || "https://placehold.co/600x400"} alt={product.name} fill className='object-cover' />
                </div>
                {/* RIGHT SIDE */}
                <div className='bg-green-00  flex  flex-col gap-4 pl-28 lg:pl-36 w-full md:w-2/3 justify-between'>
                    <h1 className='text-4xl font-semibold text-gray-900'>{product.name}</h1>
                    <p className='text-2xl font-bold text-[#ff6600]'>${product.price}</p>
                    <p className='w-full md:w-1/2 text-gray-700 leading-relaxed'>{product.description}</p>
                    <p className='text-gray-500'>stock available : {product.stock}</p>
                    <QuantitySelector productId={id} stock={product.stock}  />
                </div>
            </div>
        </div>
    )
}

export default page;

