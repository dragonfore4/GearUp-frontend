"use client";
import { SubmitButton, SubmitButtonClient } from '@/components/form/Button';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { SourceTextModule } from 'vm';

const AddProductPage = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();    
        setLoading(true);


        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const price = formData.get("price") as string;
        const description = formData.get("description") as string;
        const stock = formData.get("stock") as string;
        const image = formData.get("image") as File;
        const productTypeId = formData.get("productTypeId") as string;

        // Validation
        if (!name || !description || parseFloat(price) <= 0 || parseInt(stock) <= 0) {
            toast.error('Please fill all required fields with valid values');
            return;

        }
    

        // console.log(name, price, description, stock, productTypeId);
        // console.log(image)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                toast.error(`Error: ${response.status}`);
                // throw new Error(`Error: ${response.status}`);
            }

            toast.success('Product created successfully');
        } catch (error) {
            toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
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
                                    <img
                                        src={imagePreview}
                                        alt="Product preview"
                                        className="w-full h-full object-contain"
                                    />
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
                                    onChange={handleImageChange}
                                />
                            </div>
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
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="productTypeId" className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                                <select name='productTypeId' className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
                                    <option value="1">Laptop & Computer</option>
                                    <option value="2">Mobile & Accessories</option>
                                    <option value="3">Storage & External Devices</option>
                                    <option value="4">Fashion & Accessories</option>
                                    <option value="5">Lighting & Home Decor</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end pt-4">
                        <SubmitButtonClient name={''} text={'submit'} loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
