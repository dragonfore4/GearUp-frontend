import ProductReview from '@/components/product/ProductReview';
import QuantitySelector from '@/components/product/QuantitySelector';
import { Product } from '@/types/type';
import Image from 'next/image';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const page = async ({ params }: { params: { id: number } }) => {
    const { id } = await params;

    const productResponse = await fetch(`http://localhost:8080/api/products/${id}`);
    const product: Product = await productResponse.json();

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb - Stylish */}
                <nav className="flex items-center text-sm text-gray-500 mb-10 space-x-2">
                    <span className="hover:text-indigo-600 transition cursor-pointer">Home</span>
                    <FaChevronRight className="text-xs" />
                    <span className="hover:text-indigo-600 transition cursor-pointer">Shop</span>
                    <FaChevronRight className="text-xs" />
                    <span className="text-gray-900 font-semibold truncate">{product.name}</span>
                </nav>

                {/* Product Section */}
                <div className="flex flex-col lg:flex-row gap-10 bg-white p-8 rounded-2xl shadow-lg">
                    {/* LEFT - Product Image */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                            <Image
                                src={product.imageUrl || "https://placehold.co/600x400"}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105 rounded-xl"
                                priority
                            />
                        </div>
                    </div>

                    {/* RIGHT - Product Info */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                                {product.name}
                            </h1>
                            <p className="text-lg font-semibold text-indigo-600 mb-2">
                                {product.productType.name}
                            </p>
                            <p className="text-2xl font-semibold text-indigo-600 mb-4">
                                ${product.price}
                            </p>
                            <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Stock Info */}
                            <p className="text-sm text-gray-500 mb-2">
                                Stock available:{" "}
                                <span className="font-semibold text-gray-800">{product.stock}</span>
                            </p>

                        </div>
                        {/* Quantity Selector */}
                        <div className="mt-4 mb-8">
                            <QuantitySelector productId={id} stock={product.stock} />
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                        Customer Reviews
                    </h2>
                    <div className="flex flex-col gap-8">
                        <ProductReview />
                        <ProductReview
                            shortName="SR"
                            name="Sira Rueng"
                            day={3}
                            review="This product made my life more easier! You guys have to buy this one."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
