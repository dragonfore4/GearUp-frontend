// import Image from "next/image";
// import Link from "next/link";
// import FeaturedProducts from "@/components/product/FeaturedProducts";
// // import Categories from "@/components/product/Categories";

// export default function Home() {
//     return (
//         <div className="bg-gray-50 font-sans">
//             {/* BANNER */}
//             <div className="relative h-[500px] w-full">
//                 {/* <Image src="/pictures/banner.png" alt="GearUp Banner" layout="fill" objectFit="cover" className="absolute" /> */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white p-6 text-center">
//                     <h1 className="text-6xl font-extrabold drop-shadow-lg">Gear Up for Your Next Adventure</h1>
//                     <p className="mt-4 text-xl opacity-90">Find the best tech, gadgets, and accessories all in one place.</p>
//                     <Link href="/shop" className="mt-6 px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 text-white text-lg rounded-full shadow-lg hover:scale-105 transition-transform">Shop Now</Link>
//                 </div>
//             </div>

//             {/* FEATURED PRODUCTS */}
//             <div className="container mx-auto px-6 py-16">
//                 <div className="flex justify-between items-center">
//                     <h2 className="text-4xl font-extrabold text-gray-800">Featured Products</h2>
//                     <Link href="/shop" className="text-lg text-red-600 hover:text-red-800 transition">View All</Link>
//                 </div>
//                 <FeaturedProducts />
//             </div>

//             {/* CATEGORIES */}
          

//             {/* CALL TO ACTION */}
           
//         </div>
//     );
// }

import Image from "next/image";
import Link from "next/link";
import FeaturedProducts from "@/components/product/FeaturedProducts";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
    return (
        <div className="bg-gray-50 font-sans">
            {/* HERO BANNER */}
            <div className="relative h-[600px] w-full overflow-hidden">
                {/* Background Image - Uncomment when you have an image */}
                 <Image 
                    src="/pictures/banner.png" 
                    alt="GearUp Banner" 
                    layout="fill" 
                    objectFit="cover" 
                    className="absolute scale-110 filter brightness-75" 
                    priority
                /> 
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-black/70 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight animate-fade-in-up">
                            Gear Up for Your Next Adventure
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                            Find the best tech, gadgets, and accessories all in one place. 
                            Elevate your experience with premium quality products.
                        </p>
                        <Link 
                            href="/shop" 
                            className="mt-8 inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Shop Now
                            <FaArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* FEATURED PRODUCTS */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
                    <div className="relative">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Featured Products
                        </h2>
                        <div className="absolute -bottom-3 left-0 h-1 w-full bg-indigo-600"></div>
                    </div>
                    <Link 
                        href="/shop" 
                        className="mt-4 sm:mt-0 flex items-center text-lg text-indigo-600 hover:text-indigo-800 transition-colors group"
                    >
                        View All 
                        <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                            <FaArrowRight />
                        </span>
                    </Link>
                </div>
                <FeaturedProducts slice={4}/>
            </div>

            {/* CALL TO ACTION SECTION */}
            <div className="bg-gradient-to-r from-indigo-800 to-purple-900 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to upgrade your tech collection?
                    </h2>
                    <p className="text-lg text-indigo-100 mb-10 max-w-3xl mx-auto">
                        Join thousands of satisfied customers who have transformed their digital experience with GearUp's premium products.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/shop" 
                            className="px-8 py-4 bg-white text-indigo-800 font-medium rounded-full shadow-lg hover:shadow-xl transition duration-300 hover:bg-gray-100"
                        >
                            Browse Collection
                        </Link>
                        <Link 
                            href="/contact" 
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-indigo-800 transition duration-300"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
