// "use client"
// import AllProject from '@/components/admin/AllProject'
// import React, { useState } from 'react'

// const AdminPage = () => {

//     const [currentPage, setCurrentPage] = useState(0)

//     const pages = [
//         {
//             name: "All Products",
//             page: <AllProject />
//         }, {
//             name: "Approved Products",
//             // page: <ApprovedProject/>
//         }, {
//             name: "Pending Products",
//             // page: <PendingProjects/>
//         }, {
//             name: "Transactions",
//             // page: <Transactions/>
//         }
//     ]

//     return (
//         <div className='flex  '>

//             {/* LEFT PANEL */}
//             <div className='w-1/6 min-h-[calc(100vh-82px)] bg-[#f7f7f9] border-r-2  flex flex-col justify-between '>
//                 <div className='p-8 flex flex-col gap-2'>
//                     <h1 className='text-2xl mb-2 font-semibold text-black'>Admin Panel</h1>
//                     <ul className='gap-4'>
//                         {pages.map((page, index) => (
//                             // <li key={index} className={`text-base  px-4 py-3 text-black hover:bg-[#3c4963]  hover:text-white rounded-lg ${currentPage == index ? "bg-[#2d3648] text-white" : ""}`} onClick={() => setCurrentPage(index)}>{page.name}</li>
//                             <li key={index} className={`text-md  px-4 py-3 text-[#63676B] rounded-lg ${currentPage == index ? "bg-white text-blue-500 font-bold shadow-md" : "hover:font-semibold "}`} onClick={() => setCurrentPage(index)}>{page.name}</li>
//                         ))}
//                     </ul>
//                 </div>
//                 {/* User info */}
//                 <div className='flex flex-row gap-4 bg-green-00 p-4 fixed bottom-0 w-full'>
//                     <div className=' h-12 w-12 bg-gray-400 rounded-full flex justify-center items-center'>
//                         <span className='text-sm text-center text-black'>SR</span>
//                     </div>
//                     <div className='bg-red-00 flex flex-col justify-between '>
//                         <h1 className='text-md font-semibold text-black'>Sirasith</h1>
//                         <p className='text-sm text-gray-500'>Sirasith@gmail.com</p>
//                     </div>
//                 </div>
//             </div>
//             {/* RIGHT Panel */}
//             <div className='w-5/6 px-24 p-10'>
//                 {pages[currentPage].page}
//             </div>
//         </div>
//     )
// }

// export default AdminPage
"use client";
import AllProject from '@/components/admin/AllProject';
import Transactions from '@/components/admin/Transactions';
import React, { useState } from 'react';
import { FaBox, FaExchangeAlt, FaTachometerAlt, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';

const AdminPage = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        // {
            // name: "Dashboard",
            // icon: <FaTachometerAlt className="mr-3" />,
            // page: <Dashboard />
        // },
        {
            name: "All Products",
            icon: <FaBox className="mr-3" />,
            page: <AllProject />
        }, 
        {
            name: "Transactions",
            icon: <FaExchangeAlt className="mr-3" />,
            page: <Transactions />
        },
        {
            name: "User Management",
            icon: <FaUsers className="mr-3" />,
            // page: <UserManagement />
        },
        {
            name: "Analytics",
            icon: <FaChartBar className="mr-3" />,
            // page: <Analytics />
        },
        // {
        //     name: "Settings",
        //     icon: <FaCog className="mr-3" />,
        //     // page: <Settings />
        // }
    ];

    return (
        <div className='flex'>
            {/* LEFT PANEL */}
            <div className='w-1/6 min-h-[calc(100vh-82px)] bg-[#f7f7f9] border-r-2 flex flex-col justify-between'>
                <div className='p-8 flex flex-col gap-2'>
                    <h1 className='text-2xl mb-4 font-semibold text-black'>Admin Panel</h1>
                    <ul className='gap-4'>
                        {pages.map((page, index) => (
                            <li 
                                key={index} 
                                className={`text-md px-4 py-3 text-[#63676B] rounded-lg flex items-center cursor-pointer transition-all duration-200 ${
                                    currentPage === index 
                                        ? "bg-white text-blue-500 font-bold shadow-md" 
                                        : "hover:font-semibold hover:bg-white/50"
                                }`} 
                                onClick={() => setCurrentPage(index)}
                            >
                                {page.icon} {page.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* User info */}
                <div className='p-8 border-t border-gray-200'>
                    <div className='flex flex-col gap-6'>
                        <button className='flex items-center text-red-500 hover:text-red-600 transition-colors'>
                            <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                        
                        <div className='flex flex-row gap-4'>
                            <div className='h-12 w-12 bg-blue-500 text-white rounded-full flex justify-center items-center'>
                                <span className='text-sm text-center'>SR</span>
                            </div>
                            <div className='flex flex-col justify-between'>
                                <h1 className='text-md font-semibold text-black'>Sirasith</h1>
                                <p className='text-sm text-gray-500'>Sirasith@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* RIGHT Panel */}
            <div className='w-5/6 px-8 py-10 bg-gray-50'>
                {pages[currentPage].page}
            </div>
        </div>
    );
};

export default AdminPage;