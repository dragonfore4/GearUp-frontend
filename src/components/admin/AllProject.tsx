"use client";

import React, { useEffect, useState } from 'react';

const AllProject = () => {
    const [data, setData] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [editProductId, setEditProductId] = useState<number | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`http://localhost:8080/api/products?page=${page - 1}&limit=10`);
            if (!response.ok) {
                return <div className="text-red-500">Failed to load products</div>;
            }
            const data = await response.json();
            setData(data);
            const products = data.products;
            setProducts(products);
        };

        fetchProducts();
    }, [page]);

    // Function for handling edit click
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        // console.log(formData.get("name"), formData.get("price"), formData.get("description"), formData.get("stock"));

        const updatedProduct = {
            id: editProductId,
            name: formData.get("name") as string,
            price: parseFloat(formData.get("price") as string),
            description: formData.get("description") as string,
            stock: parseInt(formData.get("stock") as string),
        };

        // console.log(updatedProduct);

        try {
            const response = await fetch(`http://localhost:8080/api/products/${editProductId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
                credentials: "include"
            })
            if (response.ok) {
                console.log("success")

            }

        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    // Function for handling delete click
    const handleDelete = (id: number) => {
        console.log('Delete product with id:', id);
        // Implement your logic for deleting product
    };

    // Prevent going beyond the first or last page
    const handleNextPage = () => {
        if (data && page < data.totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div className='h-full relative'>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-2xl font-semibold'>
                    All Products Dashboard <span className='text-gray-500'>{data?.totalItems || 0} Total</span>
                </h1>
                <div className='h-[1px] bg-gray-300' />
            </div>

            {/* Table for displaying products */}
            <div className='overflow-x-auto'>
                <table className='min-w-full table-auto border-collapse'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-left border-b'>Product Name</th>
                            <th className='px-4 py-2 text-left border-b'>Product #id</th>
                            <th className='px-4 py-2 text-left border-b'>Description</th>
                            <th className='px-4 py-2 text-left border-b'>Price</th>
                            <th className='px-4 py-2 text-left border-b'>Stock</th>
                            <th className='px-4 py-2 text-left border-b'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any, index: number) => (
                            <tr key={product.id} className='border-b'>
                                <td className='px-4 py-2'>{product.name}</td>
                                <td className='px-4 py-2'>{product.id}</td>
                                <td className='px-4 py-2'>{product.description}</td>
                                <td className='px-4 py-2'>${product.price}</td>
                                <td className='px-4 py-2'>
                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                </td>
                                <td>
                                    <div className='flex gap-4'>
                                        <button
                                            onClick={() => setEditProductId(product.id === editProductId ? null : product.id)}
                                            className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                                        >
                                            Edit
                                        </button>
                                        {editProductId && editProductId === product.id && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                                <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                                                    {/* Modal Header */}
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
                                                        <button
                                                            onClick={() => setEditProductId(null)}
                                                            className="text-gray-500 hover:text-gray-700 transition-colors"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {/* Modal Body */}
                                                    <form className="space-y-4" onSubmit={handleEdit}>
                                                        <div>
                                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                defaultValue={product.name}
                                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                                            <input
                                                                type="number"
                                                                id="price"
                                                                name="price"
                                                                defaultValue={product.price}
                                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                                            <textarea
                                                                id="description"
                                                                name="description"
                                                                defaultValue={product.description}
                                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-35 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                                                            <input
                                                                type="number"
                                                                id="stock"
                                                                name="stock"
                                                                defaultValue={product.stock}
                                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                        </div>

                                                        {/* Modal Footer */}
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditProductId(null)}
                                                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                                            >
                                                                Save Changes
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className='flex justify-center items-center gap-4 mt-8 relative bottom-4'>
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-300'
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={data?.totalPages === page}
                    className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-300'
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllProject;