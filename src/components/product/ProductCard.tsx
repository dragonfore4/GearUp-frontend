import { ProductType } from '@/types/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }: { product?: ProductType }) => {
    const truncateName = (name?: string, limit = 18) => {
        if (!name) return '';
        return name.length > limit ? `${name.substring(0, limit)}...` : name;
    };

    const truncateDescription = (desc?: string, limit = 60) => {
        if (!desc) return '';
        return desc.length > limit ? `${desc.substring(0, limit)}...` : desc;
    };

    return (
        <div className="group">
            <Link href={`/products/${product?.id}`}>
                <div className="bg-white overflow-hidden rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-2 h-full flex flex-col w-96">
                    {/* Image container with gradient overlay on hover */}
                    <div className="relative overflow-hidden h-56 w-full">
                        <Image src={product?.imageUrl || "https://placehold.co/600x400"} fill alt={product?.name || "product"} className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-2 flex-grow">
                        <div className="flex justify-between items-start">
                            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                {truncateName(product?.name)}
                            </h2>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>

                        <div className="mt-1 mb-3">
                            <p className="text-sm text-gray-500 line-clamp-2">{truncateDescription(product?.description)}</p>
                        </div>

                        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100">
                            <div className="flex items-center">
                                <span className="text-xl font-bold text-gray-900">${product?.price?.toFixed(2)}</span>
                                
                            </div>

                            {product?.stock && product.stock <= 5 && (
                                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                    Only {product.stock} left
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;