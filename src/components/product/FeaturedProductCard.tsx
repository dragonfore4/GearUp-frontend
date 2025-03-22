

// import { ProductType } from '@/types/type';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';

// const ProductCard = ({ product }: { product?: ProductType }) => {
//     const truncateName = (name?: string, limit = 18) => {
//         if (!name) return '';
//         return name.length > limit ? `${name.substring(0, limit)}...` : name;
//     };

//     const truncateDescription = (desc?: string, limit = 60) => {
//         if (!desc) return '';
//         return desc.length > limit ? `${desc.substring(0, limit)}...` : desc;
//     };

//     return (
   
//         <Link
//             href={`/products/${product?.id}`}
//             className="group flex flex-col gap-4 bg-purple-00 w-full sm:w-[45%] lg:w-[22%]"

//         >
//             <div className="bg-white overflow-hidden rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-2 h-full flex flex-col w-full ">
//                 {/* Images */}
//                 <div className="relative overflow-hidden h-56 w-full">
//                     <Image src={product?.imageUrl || "https://placehold.co/600x400"} fill alt={product?.name || "product"} className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110' />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 {/* Content */}
//                 <div className="p-5 flex flex-col gap-2 flex-grow">
//                     <div className="flex justify-between items-start">
//                         <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
//                             {truncateName(product?.name)}
//                         </h2>
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                         </svg>
//                     </div>
//                     <div className="mt-1 mb-3">
//                         <p className="text-sm text-gray-500 line-clamp-2">{truncateDescription(product?.description)}</p>
//                     </div>
//                     <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100">
//                         <div className="flex items-center">
//                             <span className="text-xl font-bold text-gray-900">${product?.price?.toFixed(2)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// };

// export default ProductCard;

import { Product, ProductType } from '@/types/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaShoppingCart, FaRegHeart, FaStar } from 'react-icons/fa';

const FeaturedProductCard = ({ product }: { product?: Product }) => {
    const truncateName = (name?: string, limit = 18) => {
        if (!name) return '';
        return name.length > limit ? `${name.substring(0, limit)}...` : name;
    };

    const truncateDescription = (desc?: string, limit = 60) => {
        if (!desc) return '';
        return desc.length > limit ? `${desc.substring(0, limit)}...` : desc;
    };

    // console.log(product);
    return (
        <div className="group h-full w-full ">
            <Link
                href={`/products/${product?.id}`}
                className="block h-full bg-white  rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 ease-out transform hover:-translate-y-2 overflow-hidden"
            >
                {/* Product Image */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                    <Image 
                        src={product?.imageUrl || "https://placehold.co/600x400"} 
                        fill 
                        alt={product?.name || "product"} 
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                    />
                    
                    {/* Overlay with action buttons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <FaStar className="text-yellow-400" />
                                <span className="text-white text-sm font-medium">4.8</span>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300">
                                    <FaRegHeart className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300">
                                    <FaShoppingCart className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Product badge - if needed */}
                    {product?.price && product.price < 50 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                            Sale
                        </div>
                    )}
                </div>
                
                {/* Product Content */}
                <div className="p-5">
                    <div className="mb-2">
                        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
                            {product?.productType.name || "Technology"}
                        </span>
                    </div>
                    
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 mb-2">
                        {truncateName(product?.name)}
                    </h2>
                    
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                        {truncateDescription(product?.description)}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xl font-bold text-gray-900">
                            ${product?.price?.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                            View Details
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default FeaturedProductCard;