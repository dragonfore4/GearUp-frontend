"use client";
import React, { useState } from 'react'

const mockTransactions = [
    {
        id: 1,
        date: '2025-03-09',
        products: [
            { id: 'p1', name: 'Laptop', price: 1200 },
            { id: 'p2', name: 'Mouse', price: 30 }
        ]
    },
    {
        id: 2,
        date: '2025-03-08',
        products: [
            { id: 'p3', name: 'Keyboard', price: 50 }
        ]
    }
];

const TransactionContainer = () => {
    const [transactions] = useState(mockTransactions);
    const [expanded, setExpanded] = useState(null);

    return (
        <div className="space-y-4">
            {transactions.map((tx, index) => (
                <div key={tx.id} className="border rounded-lg p-4 bg-white shadow">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setExpanded(expanded === index ? null : index)}
                    >
                        <span className="font-semibold">Transaction #{tx.id} - {tx.date}</span>
                        <button className="text-blue-500">{expanded === index ? 'Hide' : 'View'} Products</button>
                    </div>
                    {expanded === index && (
                        <div className="mt-2 p-2 border-t">
                            <ul className="list-disc pl-5">
                                {tx.products.map(product => (
                                    <li key={product.id}>{product.name} - ${product.price}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default TransactionContainer