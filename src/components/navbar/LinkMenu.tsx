"use client";
import { useAuth } from '@/app/context/AuthContext';
import { linksPage } from '@/utils/linksPage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const LinkMenu = () => {

    const { username } = useAuth();
    const pathname = usePathname();
    const [selected, setSelected] = useState<String>(pathname);

    // Function to handle link click and set selected state
    const handleClick = (href: string) => {
        setSelected(href);
    };

    useEffect(() => {
        // Update selected when pathname changes (i.e., when the page is refreshed or navigated)
        setSelected(pathname);
    }, [pathname]);

    return (
        <ul className="flex space-x-8">
            {linksPage.map((link, index) => (
                <Link href={link.href} key={index}>
                    <li
                        className={`text-lg text-black cursor-pointer ${selected === link.href ? "underline" : ""}`}
                        onClick={() => handleClick(link.href)}
                    >
                        {link.name}
                    </li>
                </Link>
            ))}
            {username && (username === "test4" || username === "admin") && (
                <>
                    <Link href={"/addProduct"} className='text-lg text-black cursor-pointer'>Add Product</Link>
                    <Link href={"/admin"} className='text-lg text-black cursor-pointer'>Admin</Link>
                </>
            )}
        </ul>
    );
};

export default LinkMenu;
