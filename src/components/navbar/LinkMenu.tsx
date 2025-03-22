"use client";
import { useAuth } from '@/context/AuthContext';
import { linksPage } from '@/utils/linksPage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const LinkMenu = () => {
    const { username } = useAuth();
    const pathname = usePathname();
    const [selected, setSelected] = useState(pathname);

    // Function to handle link click and set selected state
    const handleClick = (href: string) => {
        setSelected(href);
    };

    useEffect(() => {
        // Update selected when pathname changes
        setSelected(pathname);
    }, [pathname]);

    return (
        <ul className="flex flex-wrap md:flex-nowrap justify-center gap-3 md:gap-6">
            {linksPage.map((link, index) => (
                <Link href={link.href} key={index}>
                    <li
                        className={`relative px-2 py-1 text-sm md:text-base font-medium transition-all duration-300 hover:text-indigo-600 ${selected === link.href
                                ? "text-indigo-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600"
                                : "text-gray-700"
                            }`}
                        onClick={() => handleClick(link.href)}
                    >
                        {link.name}
                    </li>
                </Link>
            ))}
            {username && (username === "test4" || username === "admin") && (
                <>
                    <Link href="/addProduct">
                        <li className={`relative px-2 py-1 text-sm md:text-base font-medium transition-all duration-300 hover:text-indigo-600 ${selected === "/addProduct"
                                ? "text-indigo-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600"
                                : "text-gray-700"
                            }`}
                            onClick={() => handleClick("/addProduct")}>
                            Add Product
                        </li>
                    </Link>
                    <Link href="/admin">
                        <li className={`relative px-2 py-1 text-sm md:text-base font-medium transition-all duration-300 hover:text-indigo-600 ${selected === "/admin"
                                ? "text-indigo-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600"
                                : "text-gray-700"
                            }`}
                            onClick={() => handleClick("/admin")}>
                            Admin
                        </li>
                    </Link>
                </>
            )}
        </ul>
    );
};

export default LinkMenu;