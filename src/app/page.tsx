// import FeaturedProducts from "@/components/product/FeaturedProducts";
// import ProductContainer from "@/components/product/ProductContainer";
// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//     return (
//         <div>
//             {/* BANNER */}
//             <div className="h-60 relative bg-red-00">
//                 <Image src="/pictures/banner.png" alt="Banner" layout="fill" objectFit="cover" />
//             </div>

//             <div className="containerbox items-center gap-8 bg-blue-00">
//                 {/* FEATURED PRODUCTS */}
//                 <div className="mt-8 bg-red-00 flex justify-between items-center">
//                     <h2 className="text-3xl font-bold text-center">Featured Products</h2>
//                     <Link href={"/shop"} className="text-sm hover:text-blue-500">View all</Link>
//                 </div>
//                 <FeaturedProducts/>

//             </div>
//         </div>
//     );
// }

import Image from "next/image";
import Link from "next/link";
import FeaturedProducts from "@/components/product/FeaturedProducts";
// import Categories from "@/components/product/Categories";

export default function Home() {
    return (
        <div className="bg-gray-50 font-sans">
            {/* BANNER */}
            <div className="relative h-[500px] w-full">
                {/* <Image src="/pictures/banner.png" alt="GearUp Banner" layout="fill" objectFit="cover" className="absolute" /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white p-6 text-center">
                    <h1 className="text-6xl font-extrabold drop-shadow-lg">Gear Up for Your Next Adventure</h1>
                    <p className="mt-4 text-xl opacity-90">Find the best tech, gadgets, and accessories all in one place.</p>
                    <Link href="/shop" className="mt-6 px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 text-white text-lg rounded-full shadow-lg hover:scale-105 transition-transform">Shop Now</Link>
                </div>
            </div>

            {/* FEATURED PRODUCTS */}
            <div className="container mx-auto px-6 py-16">
                <div className="flex justify-between items-center">
                    <h2 className="text-4xl font-extrabold text-gray-800">Featured Products</h2>
                    <Link href="/shop" className="text-lg text-red-600 hover:text-red-800 transition">View All</Link>
                </div>
                <FeaturedProducts />
            </div>

            {/* CATEGORIES */}
          

            {/* CALL TO ACTION */}
           
        </div>
    );
}
