"use client";
import { Order, OrderDetail } from '@/types/type';
import React, { useEffect, useState } from 'react';
import { FaSearch, FaFilter, FaSpinner, FaEye, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const Transactions = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const ordersPerPage = 10;

    useEffect(() => {
        fetchOrders();
    }, [currentPage, filterStatus]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            // Replace with your actual API endpoint
            let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders?page=${currentPage - 1}&size=${ordersPerPage}`;

            if (filterStatus !== 'ALL') {
                url += `&status=${filterStatus}`;
            }

            const response = await fetch(url, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            // Assuming your API returns { content: [...orders], totalPages: number }
            const data = await response.json();
            setOrders(data.content || data);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            //   setError(err instanceof Error ? err.message : 'An unknown error occurred');
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderDetails = async (orderId: number) => {
        if (selectedOrderId === orderId) {
            setSelectedOrderId(null);
            setOrderDetails([]);
            return;
        }

        try {
            setDetailsLoading(true);
            setSelectedOrderId(orderId);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderId}/details`, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }

            const data = await response.json();
            setOrderDetails(data);
        } catch (err) {
            console.error('Error fetching order details:', err);
        } finally {
            setDetailsLoading(false);
        }
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">COMPLETED</span>;
            case 'PROCESSING':
                return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">PROCESSING</span>;
            case 'CANCELLED':
                return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">CANCELLED</span>;
            case 'PENDING':
            case 'Pending':
                return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">PENDING</span>;
            default:
                return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800">Transaction Management</h2>
                <p className="text-gray-600 mt-1">View and manage all customer orders</p>
            </div>

            {/* Search and Filter */}
            <div className="p-6 bg-gray-50 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <FaFilter className="mr-2 text-gray-500" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="PENDING">Pending</option>
                            <option value="SHIPPING">Shipping</option>
                            <option value="PROCESSING">Processing</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center items-center p-12">
                        <FaSpinner className="animate-spin text-4xl text-blue-600" />
                    </div>
                ) : error ? (
                    <div className="text-center p-8">
                        <FaExclamationTriangle className="mx-auto text-3xl text-red-500 mb-2" />
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={fetchOrders}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Try Again
                        </button>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center p-12">
                        <p className="text-lg text-gray-500">No orders found.</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => {
                                const { date, time } = formatDateTime(order.createdAt);
                                return (
                                    <React.Fragment key={order.id}>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-semibold text-gray-900">#{order.id}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{order.user?.username || 'Anonymous'}</div>
                                                <div className="text-sm text-gray-500">{order.user?.email || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{date}</div>
                                                <div className="text-sm text-gray-500">{time}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">${order.totalPrice.toFixed(2)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(order.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => fetchOrderDetails(order.id)}
                                                        className="text-blue-600 hover:text-blue-800 flex items-center"
                                                    >
                                                        <FaEye className="mr-1" /> {selectedOrderId === order.id ? 'Hide' : 'View'}
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>

                                        {/* Order Details Row */}
                                        {selectedOrderId === order.id && (
                                            <tr>
                                                <td colSpan={6} className="p-0">
                                                    <div className="bg-gray-50 px-6 py-4 border-t border-b border-gray-200">
                                                        {detailsLoading ? (
                                                            <div className="flex justify-center py-4">
                                                                <FaSpinner className="animate-spin text-xl text-blue-600" />
                                                            </div>
                                                        ) : orderDetails ? (
                                                            <div className="bg-gray-50 px-6 py-5 space-y-4 border-t border-gray-200 animate-fade-in">
                                                                <h3 className="font-semibold text-gray-800 text-lg">Order Items</h3>

                                                                <div className="divide-y divide-gray-200">
                                                                    {orderDetails.map((detail, idx) => (
                                                                        <div
                                                                            key={idx}
                                                                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-4 text-sm sm:text-base"
                                                                        >
                                                                            <div className="flex items-center gap-4">
                                                                                <div className="bg-indigo-100 h-12 w-12 rounded-lg flex items-center justify-center">
                                                                                    <span className="text-indigo-600 font-bold">{detail.quantity}x</span>
                                                                                </div>
                                                                                <span className="font-medium text-gray-800">{detail.product.name}</span>
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

                                                        ) : (
                                                            <p className="text-center text-gray-500 py-2">No details available</p>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {!loading && !error && orders.length > 0 && (
                <div className="flex items-center justify-between p-6 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">{((currentPage - 1) * ordersPerPage) + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(currentPage * ordersPerPage, (totalPages * ordersPerPage))}</span> of{' '}
                        <span className="font-medium">{totalPages * ordersPerPage}</span> results
                    </div>
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded-md ${currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-md ${currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded-md ${currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;