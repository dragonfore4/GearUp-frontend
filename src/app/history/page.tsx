"use client";
import React, { useEffect, useState } from 'react';
import { Order, OrderDetail } from '@/types/type';
import { useAuth } from '@/context/AuthContext';
import { FaChevronDown, FaChevronUp, FaHistory, FaSpinner } from 'react-icons/fa';

const HistoryPage = () => {
    const { token, username } = useAuth();
    const [userId, setUserId] = useState<number | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [expanded, setExpanded] = useState<number | null>(null);
    const [orderDetail, setOrderDetail] = useState<OrderDetail[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [detailLoading, setDetailLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            if (!token || !username) return;

            try {
                setLoading(true);
                const userIdResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/username/${username}`, {
                    credentials: 'include',
                });

                if (!userIdResponse.ok) {
                    throw new Error('Failed to fetch user information');
                }

                const userIdData = await userIdResponse.json();
                setUserId(userIdData.id);

                const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/user/${userIdData.id}`, {
                    credentials: 'include',
                });

                if (!orderResponse.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const orderData = await orderResponse.json();
                setOrders(orderData);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUserId();
    }, [token, username]);

    const handleOpenOrderDetail = async (index: number, orderId: number) => {
        // If already expanded, just close it
        if (expanded === index) {
            setExpanded(null);
            return;
        }

        try {
            setDetailLoading(true);
            const orderDetailResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderId}/details`, {
                credentials: 'include',
            });

            if (!orderDetailResponse.ok) {
                throw new Error('Failed to fetch order details');
            }

            const orderDetailData = await orderDetailResponse.json();
            setOrderDetail(orderDetailData);
            setExpanded(index);
        } catch (error) {
            console.error("Error fetching order details:", error);
            setError(error instanceof Error ? error.message : 'Failed to load order details');
        } finally {
            setDetailLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            <div className="relative bg-gradient-to-r from-indigo-800 to-purple-900 py-16">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Your Order History
                    </h1>
                    <p className="mt-4 text-lg text-indigo-100 max-w-3xl mx-auto">
                        Track all your purchases and manage your GearUp experience
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded-lg">
                        <p className="font-medium">{error}</p>
                        <p className="mt-2">Please try again later or contact support if the problem persists.</p>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-xl shadow-md border border-gray-200 hover:border-indigo-400 transition-all duration-300 overflow-hidden"
                            >
                                <div
                                    onClick={() => handleOpenOrderDetail(index, order.id)}
                                    className="flex justify-between items-center px-6 py-5 cursor-pointer"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                        <span className="text-base sm:text-lg font-semibold text-gray-800">
                                            Order #{order.id}
                                        </span>
                                    
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                            order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <span className="text-sm font-medium text-indigo-600">
                                            ${order.totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-indigo-600">
                                        {detailLoading && expanded === null ? (
                                            <FaSpinner className="animate-spin" />
                                        ) : (
                                            <>
                                                {expanded === index ? <FaChevronUp /> : <FaChevronDown />}
                                                <span className="hover:underline font-medium text-sm sm:text-base">
                                                    {expanded === index ? 'Hide' : 'View'} Details
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {expanded === index && orderDetail && (
                                    <div className="bg-gray-50 px-6 py-5 space-y-4 border-t border-gray-200 animate-fade-in ">
                                        <h3 className="font-semibold text-gray-800 text-lg">Order Items</h3>
                                        <div className="divide-y divide-gray-200">
                                            {orderDetail.map((detail, detailIndex) => (
                                                <div
                                                    key={detailIndex}
                                                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-4 text-sm sm:text-base "
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="bg-indigo-100 h-12 w-12 rounded-lg flex items-center justify-center">
                                                            <span className="text-indigo-600 font-bold">
                                                                {detail.quantity}x
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-gray-800">
                                                            {detail.product.name}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-gray-600">
                                                            ${detail.product.price.toFixed(2)} × {detail.quantity}
                                                        </span>
                                                        <div className="font-semibold text-indigo-600">
                                                            ${(detail.product.price * detail.quantity).toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                                            <span className="font-semibold text-lg">Total</span>
                                            <span className="font-bold text-lg text-indigo-700">
                                                ${order.totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-white p-12 rounded-lg shadow-md border border-gray-200">
                        <FaHistory className="text-5xl text-indigo-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
                        <p className="text-gray-600 mb-6">
                            You haven't placed any orders yet. Start shopping to see your order history.
                        </p>
                        <a
                            href="/shop"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
                        >
                            Shop Now
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;