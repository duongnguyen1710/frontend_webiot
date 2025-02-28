import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../Config/Api';

const MomoResult = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');

    const jwt = localStorage.getItem('jwt'); // Lấy JWT từ localStorage

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            try {
                if (!jwt) {
                    setStatus('failed');
                    setMessage('JWT không tồn tại hoặc đã hết hạn');
                    return;
                }

                // Chuyển query params thành object
                const queryParams = Object.fromEntries(searchParams.entries());

                // Gọi API Backend để cập nhật giao dịch MoMo
                const response = await api.get('/api/momo/callback', {
                    params: queryParams,
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                console.log('Phản hồi từ Backend:', response.data);

                // 🔹 Kiểm tra trạng thái thanh toán từ backend
                const responseText = response.data.toLowerCase(); // Chuyển thành chữ thường để dễ kiểm tra

                if (responseText.includes('đơn hàng đã được cập nhật trạng thái: 1')) {
                    setStatus('success');
                    setMessage('Thanh toán thành công, đơn hàng đã được cập nhật!');
                } else if (responseText.includes('thanh toán thất bại')) {
                    setStatus('failed');
                    setMessage('Thanh toán thất bại! Vui lòng thử lại.');
                } else {
                    setStatus('failed');
                    setMessage('Không thể xác định trạng thái thanh toán.');
                }
            } catch (error) {
                console.error('Lỗi:', error.response?.data || error.message);
                setStatus('failed');
                setMessage(error.response?.data?.message || 'Lỗi khi xử lý thanh toán MoMo');
            }
        };

        fetchPaymentStatus();
    }, [searchParams, jwt]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {status === 'loading' && <h2>🔄 Đang xử lý thanh toán...</h2>}
            {status === 'success' && (
                <div>
                    <h2>✅ Thanh toán thành công!</h2>
                    <p>{message}</p>
                    <a href="/">Quay về trang chủ</a>
                </div>
            )}
            {status === 'failed' && (
                <div>
                    <h2>❌ Thanh toán thất bại!</h2>
                    <p>{message}</p>
                    <a href="/profile/orders">Thử lại</a>
                </div>
            )}
        </div>
    );
};

export default MomoResult;
