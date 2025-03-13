
import ProductReview from '@/components/product/ProductReview';
import QuantitySelector from '@/components/product/QuantitySelector';
import { ProductType } from '@/types/type';
import Image from 'next/image';
import React from 'react';

const page = async ({ params }: { params: { id: number } }) => {
    const { id } = await params;

    const productResponse = await fetch(`http://localhost:8080/api/products/${id}`);
    const product: ProductType = await productResponse.json();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="bg-[#f9f1e7] py-3 px-6 rounded-lg flex items-center gap-2 text-sm text-gray-500 mb-8">
                <span className="cursor-pointer hover:text-gray-700">Home</span>
                <span className="text-gray-700"> &gt; </span>
                <span className="cursor-pointer hover:text-gray-700">Shop</span>
                <span className="text-gray-700"> &gt; </span>
                <span className="text-black font-semibold">{id ? product.name : "Product Detail"}</span>
            </div>

            {/* Product Section */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* LEFT SIDE - Product Image */}
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <div className="relative h-[400px] shadow-lg rounded-lg overflow-hidden">
                        <Image
                            src={product.imageUrl || "https://placehold.co/600x400"}
                            alt={product.name}
                            layout="fill"
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* RIGHT SIDE - Product Details */}
                <div className="w-full md:w-1/2 lg:w-2/3">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-2xl font-bold text-[#0084ff] mb-6">${product.price}</p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">{product.description}</p>

                    {/* Stock Information */}
                    <div className="mb-8">
                        <p className="text-gray-500">
                            Stock available: <span className="font-medium text-gray-900">{product.stock}</span>
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-8">
                        <QuantitySelector productId={id} stock={product.stock} />
                    </div>


                </div>
            </div>

            {/* Product Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                <div className='flex flex-col gap-8'>
                    <ProductReview />
                    <ProductReview shortName='SR' name='Sira Rueng' day={3} review='This product made my life more easier!, you guys have to buy this one.' />
                </div>
            </div>
        </div>
    );
};

export default page;