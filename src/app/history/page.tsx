"use client"
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Order, OrderDetail } from '@/types/type';

const HistoryPage = () => {
    const { token, username } = useAuth();
    const [userId, setUserId] = useState<number | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [expanded, setExpanded] = useState<number | null>(null);
    const [orderDetail, setOrderDetail] = useState<OrderDetail[] | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            if (!token || !username) return;
            console.log("username: ", username);
            const userIdResponse = await fetch(`http://localhost:8080/api/users/username/${username}`);
            const userIdData = await userIdResponse.json();
            setUserId(userIdData.id);

            const orderResponse = await fetch(`http://localhost:8080/api/orders/user/${userIdData.id}`);
            const orderData = await orderResponse.json();
            console.log(orderData);
            setOrders(orderData);
        };

        fetchUserId();
    }, [token, username]);

    const handleOpenOrderDetail = async (index: number, orderId: number) => {
        try {
            const orderDetailResponse = await fetch(`http://localhost:8080/api/orders/${orderId}/details`);
            const orderDetailData = await orderDetailResponse.json();
            console.log("inisorder: ", orderDetailData);
            setOrderDetail(orderDetailData); // ✅ React will update state asynchronously
        } catch (error) {
            console.error("Error fetching order details:", error);
        }

        setExpanded(expanded === index ? null : index);
    };


    return (
        <div className='max-w-4xl mx-auto p-4'>
            <h2 className='text-2xl font-bold mb-4'>Transaction History</h2>
            <div className='space-y-4'>
                {orders.length > 0 ? orders.map((order, index) => (
                    <div className='border rounded-lg p-4 bg-white shadow' key={index}>
                        <div className={`flex justify-between items-center cursor-pointer mb-0 ${expanded != null && expanded == index ? "mb-2" : ""}`} onClick={() => handleOpenOrderDetail(index, order.id)}>
                            <div className='flex gap-8'>
                                <span className='font-semibold'>Order #{order.id} - {order.status}</span>
                                <span className='font-semibold'>Total price ${order.totalPrice}</span>

                            </div>
                            <button className='text-blue-500'>{expanded === index ? 'Hide' : 'View'} Details</button>
                        </div>
                        {expanded === index && orderDetail && orderDetail.map((detail, index) => (
                            <div key={index} className='py-2 px-2 border-t bg-green-00 h-full'>
                                <div className=' bg-red-00 flex justify-between items-center h-full'>
                                    <span className='font-semibold'>{detail.product.name}</span>
                                    <span className='font-semibold'>${detail.product.price} x {detail.quantity} = {detail.product.price * detail.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )) : <p>No orders found.</p>}
            </div>
        </div>
    );
};

export default HistoryPage;
