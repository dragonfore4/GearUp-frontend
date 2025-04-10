"use client";

import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiX, FiSave } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AllProject = () => {
    const [data, setData] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [editProductId, setEditProductId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?page=${page - 1}&limit=10`);
                if (!response.ok) {
                    throw new Error('Failed to load products');
                }
                const data = await response.json();
                setData(data);
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [page]);

    // Function for handling edit click
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const updatedProduct = {
            id: editProductId,
            name: formData.get("name") as string,
            price: parseFloat(formData.get("price") as string),
            description: formData.get("description") as string,
            stock: parseInt(formData.get("stock") as string),
        };

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${editProductId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
                credentials: "include"
            });
            
            if (response.ok) {
                // Update the product in the local state to avoid refetching
                setProducts(products.map(product => 
                    product.id === editProductId ? updatedProduct : product
                ));
                setEditProductId(null);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Function for handling delete click
    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`, {
                    method: "DELETE",
                    credentials: "include"
                });
                
                if (response.ok) {
                    // Remove the product from the local state
                    setProducts(products.filter(product => product.id !== id));
                    // Update total items count
                    if (data) {
                        setData({
                            ...data,
                            totalItems: data.totalItems - 1
                        });
                    }
                }
            } catch (error) {
                console.error("Error deleting product:", error);
            } finally {
                setIsLoading(false);
            }
        }
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
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='h-full relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm'
        >
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Products Dashboard</h1>
                    <p className='text-gray-500 flex items-center'>
                        <span className='inline-block w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                        {data?.totalItems || 0} Total Products
                    </p>
                </div>
                <div className='mt-4 sm:mt-0'>
                    <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all flex items-center'>
                        <span className='mr-2'>Add Product</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            )}

            {/* Table for displaying products */}
            {!isLoading && (
                <div className='overflow-x-auto bg-white rounded-xl shadow-md'>
                    <table className='min-w-full table-auto border-collapse'>
                        <thead>
                            <tr className='bg-gray-50'>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Product Name</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Stock</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {products.map((product: any) => (
                                <motion.tr 
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='hover:bg-gray-50'
                                >
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm font-medium text-gray-900'>{product.name}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-500'>#{product.id}</div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis'>{product.description}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm font-medium text-gray-900'>${product.price.toFixed(2)}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {product.stock > 0 ? (
                                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                {product.stock} in stock
                                            </span>
                                        ) : (
                                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                                                Out of stock
                                            </span>
                                        )}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => setEditProductId(product.id === editProductId ? null : product.id)}
                                                className='text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-full transition-colors'
                                            >
                                                <FiEdit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className='text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full transition-colors'
                                            >
                                                <FiTrash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className='flex justify-between items-center mt-6'>
                <div className='text-sm text-gray-500'>
                    Showing page {page} of {data?.totalPages || 1}
                </div>
                <div className='flex items-center gap-2'>
                    <button
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                        className='flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                    >
                        <FiChevronLeft className="h-5 w-5" />
                    </button>
                    <span className='text-sm font-medium text-gray-700'>{page}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={data?.totalPages === page}
                        className='flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                    >
                        <FiChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editProductId && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4"
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                                <button
                                    onClick={() => setEditProductId(null)}
                                    className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                                >
                                    <FiX className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form className="space-y-5" onSubmit={handleEdit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        defaultValue={products.find(p => p.id === editProductId)?.name}
                                        className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        step="0.01"
                                        defaultValue={products.find(p => p.id === editProductId)?.price}
                                        className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="0.00"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        defaultValue={products.find(p => p.id === editProductId)?.description}
                                        className="block w-full border border-gray-300 rounded-lg p-3 h-24 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="Enter product description"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        defaultValue={products.find(p => p.id === editProductId)?.stock}
                                        className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="0"
                                    />
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditProductId(null)}
                                        className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        <FiSave className="h-4 w-4" />
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AllProject;