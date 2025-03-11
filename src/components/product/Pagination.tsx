"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => {
    // console.log("Current Page:", currentPage, "Total Pages:", totalPages);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    // ✅ แปลง currentPage ให้เป็นตัวเลขเผื่อมันเป็น string
    const parsedPage = Number(currentPage);

    // ✅ ฟังก์ชันเปลี่ยนหน้า
    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;

        params.set("page", page.toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="mt-6 flex justify-center space-x-2">
            {/* ปุ่มย้อนกลับ */}
            <button
                className={`px-4 py-2 border rounded ${parsedPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
                disabled={parsedPage === 1}
                onClick={() => goToPage(parsedPage - 1)}
            >
                Previous
            </button>

            {/* แสดงหมายเลขหน้า */}
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    className={`px-4 py-2 border rounded ${parsedPage === index + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                    onClick={() => goToPage(index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            {/* ปุ่มไปหน้าถัดไป */}
            <button
                className={`px-4 py-2 border rounded ${parsedPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
                disabled={parsedPage === totalPages}
                onClick={() => goToPage(parsedPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
