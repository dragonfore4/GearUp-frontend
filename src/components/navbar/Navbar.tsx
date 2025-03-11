import React from 'react';
import LinkMenu from './LinkMenu';
import { FaUser } from 'react-icons/fa';
import UserMenu from './UserMenu';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-6 bg-white border-b-2 border-gray-200 px-20 bgred">
            <div className="flex items-center">
                {/* <img src="logo.png" alt="Furniro Logo" className="w-10 h-10" /> */}
                <Link href="/">
                <span className="text-2xl font-bold text-black ml-2">GearUp</span>
                </Link>
            </div>
            <LinkMenu />

            <UserMenu />
        </nav>
    );
};

export default Navbar;
