// import React from 'react';
// import LinkMenu from './LinkMenu';
// import { FaUser } from 'react-icons/fa';
// import UserMenu from './UserMenu';
// import Link from 'next/link';

// const Navbar = () => {
//     return (
//         <nav className="flex justify-between items-center py-6 bg-white border-b-2 border-gray-200 px-20 bgred">
//             <div className="flex items-center">
//                 {/* <img src="logo.png" alt="Furniro Logo" className="w-10 h-10" /> */}
//                 <Link href="/">
//                 <span className="text-2xl font-bold text-black ml-2">GearUp</span>
//                 </Link>
//             </div>
//             <LinkMenu />

//             <UserMenu />
//         </nav>
//     );
// };

// export default Navbar;

"use client";
import React from 'react';
import LinkMenu from './LinkMenu';
import UserMenu from './UserMenu';
import Link from 'next/link';
import { FaStore } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md transition-all duration-300 py-4 px-6 md:px-16 lg:px-20">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <Link href="/" className="group flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                        <FaStore className="text-white text-xl" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        GearUp
                    </span>
                </Link>

                {/* Middle Link Section */}
                <div className="hidden md:block">
                    <LinkMenu />
                </div>

                {/* User Menu Section */}
                <UserMenu />
            </div>
            
            {/* Mobile Menu - Only shown on small screens */}
            <div className="md:hidden mt-4 border-t border-gray-100 pt-3">
                <LinkMenu />
            </div>
        </nav>
    );
};

export default Navbar;