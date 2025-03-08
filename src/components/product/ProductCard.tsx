import { ProductType } from '@/types/type'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }: { product?: ProductType }) => {
    return (
        <Link href={`/products/${product?.id}`}>
            <div className='bg-white mt-2 rounded-lg shadow-lg p-4 flex flex-col border border-[#e3e2e2] hover:-translate-y-2 transform transition duration-300 ease-in-out'>
                <img src={product?.imageUrl || "https://placehold.co/600x400"} alt={product?.name} className='w-48 h-48 object-cover mx-auto rounded-xl' />
                <div className='mt-4 flex flex-col gap-2 bg-red-00 flex-grow justify-between'>
                    <div className='bg-red-00 flex justify-between in-checked:'>
                        <h2 className='text-lg font-semibold'>{product?.name && product.name.length > 8 ? product.name.substring(0,9) : product?.name}</h2>
                        <button>+</button>
                    </div>
                    <div className='w-full'>
                        <p className='text-sm text-gray-500'>{product?.description.substring(0, 23)}</p>
                    </div>
                    <p className='text-black font-bold'>${product?.price}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard