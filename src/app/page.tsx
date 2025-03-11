import FeaturedProducts from "@/components/product/FeaturedProducts";
import ProductContainer from "@/components/product/ProductContainer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            {/* BANNER */}
            <div className="h-60 relative bg-red-00">
                <Image src="/pictures/banner.png" alt="Banner" layout="fill" objectFit="cover" />
            </div>

            <div className="containerbox items-center gap-8 bg-blue-00">
                {/* FEATURED PRODUCTS */}
                <div className="mt-8 bg-red-00 flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-center">Featured Products</h2>
                    <Link href={"/shop"} className="text-sm hover:text-blue-500">View all</Link>
                </div>
                <FeaturedProducts/>

            </div>
        </div>
    );
}
