"use client";
import React, { useState, useRef } from 'react';
import { SubmitButton } from '@/components/form/Button';
import FormInputClient from '@/components/form/FormInputClient';
import { toast } from 'sonner';
import Image from 'next/image';

const AddProductPage = () => {
    type InputType = {
        name: string,
        price: number,
        description: string,
        stock: number,
        image: File | null,
    }

    const [formData, setFormData] = useState<InputType>({
        name: "",
        price: 0,
        description: "",
        stock: 0,
        image: null
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value, type } = e.target;

        if (type === "file" && e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData({ ...formData, [name]: file });
            
            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.description || formData.price <= 0 || formData.stock <= 0) {
            toast.error('Please fill all required fields with valid values');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("price", formData.price.toString());
        formDataToSend.append("description", formData.description);
        formDataToSend.append("stock", formData.stock.toString());
        
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                credentials: 'include',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            toast.success('Product created successfully');
            
            // Reset form
            setFormData({
                name: "",
                price: 0,
                description: "",
                stock: 0,
                image: null
            });
            setImagePreview(null);
            
            // Delay redirect to allow toast to show
            setTimeout(() => {
                window.location.href = '/addProduct';
            }, 1500);
        } catch (error) {
            toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb container */}
            <div className="bg-[#f9f1e7] py-3 px-6 rounded-lg flex items-center gap-2 text-sm text-gray-600 mb-8 shadow-sm">
                <span className="cursor-pointer hover:text-gray-900 transition-colors">Home</span>
                <span className="text-gray-900"> &gt; </span>
                <span className="font-medium text-gray-900">Add Product</span>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* LEFT SIDE - IMAGE UPLOAD */}
                        <div className="w-full md:w-1/3">
                            <div 
                                className="relative w-full h-84 border-2 border-dashed rounded-lg overflow-hidden cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                onClick={handleImageClick}
                            >
                                {imagePreview ? (
                                    <div className="w-full h-full relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src={imagePreview} 
                                            alt="Product preview" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <p className="text-gray-500 font-medium mb-1">Click to upload product image</p>
                                        <p className="text-gray-400 text-sm">PNG, JPG, JPEG up to 5MB</p>
                                    </div>
                                )}
                                
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleChange}
                                />
                            </div>
                            {imagePreview && (
                                <button 
                                    type="button" 
                                    className="absolute mt-2 text-red-500 text-sm font-medium hover:text-red-700"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setFormData({...formData, image: null});
                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                    }}
                                >
                                    Remove image
                                </button>
                            )}
                        </div>

                        {/* RIGHT SIDE - FORM FIELDS */}
                        <div className="w-full md:w-2/3 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        rows={4}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter product description"
                                        required
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            min="0.01"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                                        <input
                                            type="number"
                                            id="stock"
                                            name="stock"
                                            min="0"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                        <button
                            type="button"
                            className="mr-4 px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                            onClick={() => window.location.href = '/products'}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;