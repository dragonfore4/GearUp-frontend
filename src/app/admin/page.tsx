"use client"
import AllProject from '@/components/admin/AllProject'
// import AllProject from '@/components/default/(admin)/AllProject'
// import ApprovedProject from '@/components/default/(admin)/ApprovedProject'
// import PendingProjects from '@/components/default/(admin)/PendingProjects'
// import Transactions from '@/components/default/(admin)/Transactions'
// import UsersList from '@/components/default/(admin)/UsersList'
import React, { useState } from 'react'

const AdminPage = () => {

    const [currentPage, setCurrentPage] = useState(0)

    const pages = [
        {
            name: "All Products",
            page: <AllProject />
            // page: <AllProject/>
        }, {
            name: "Approved Products",
            // page: <ApprovedProject/>
        }, {
            name: "Pending Products",
            // page: <PendingProjects/>
        }, {
            name: "Transactions",
            // page: <Transactions/>
        }
    ]

    return (
        <div className='flex  '>

            {/* LEFT PANEL */}
            <div className='w-1/6 min-h-[calc(100vh-82px)] bg-[#f7f7f9] border-r-2  flex flex-col justify-between '>
                <div className='p-8 flex flex-col gap-2'>
                    <h1 className='text-2xl mb-2 font-semibold text-black'>Admin Panel</h1>
                    <ul className='gap-4'>
                        {pages.map((page, index) => (
                            // <li key={index} className={`text-base  px-4 py-3 text-black hover:bg-[#3c4963]  hover:text-white rounded-lg ${currentPage == index ? "bg-[#2d3648] text-white" : ""}`} onClick={() => setCurrentPage(index)}>{page.name}</li>
                            <li key={index} className={`text-md  px-4 py-3 text-[#63676B] rounded-lg ${currentPage == index ? "bg-white text-blue-500 font-bold shadow-md" : "hover:font-semibold "}`} onClick={() => setCurrentPage(index)}>{page.name}</li>
                        ))}
                    </ul>
                </div>
                {/* User info */}
                <div className='flex flex-row gap-4 bg-green-00 p-4 fixed bottom-0 w-full'>
                    <div className=' h-12 w-12 bg-gray-400 rounded-full flex justify-center items-center'>
                        <span className='text-sm text-center text-black'>SR</span>
                    </div>
                    <div className='bg-red-00 flex flex-col justify-between '>
                        <h1 className='text-md font-semibold text-black'>Sirasith</h1>
                        <p className='text-sm text-gray-500'>Sirasith@gmail.com</p>
                    </div>
                </div>
            </div>
            {/* RIGHT Panel */}
            <div className='w-5/6 px-24 p-10'>
                {pages[currentPage].page}
            </div>
        </div>
    )
}

export default AdminPage
