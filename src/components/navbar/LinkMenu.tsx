"use client";
import { linksPage } from '@/utils/linksPage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const LinkMenu= () => {
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
        </ul>
    );
};

export default LinkMenu;
