import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../Config/Api';

const PaymentResult = () => {
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
                console.log('Params từ URL:', queryParams);

                // Gọi API Backend để cập nhật giao dịch
                const response = await api.get('/api/payment/success', {
                    params: queryParams,
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                console.log('Phản hồi từ Backend:', response.data);

                if (response.status === 200) {
                    setStatus('success');
                    setMessage(response.data);
                } else {
                    setStatus('failed');
                    setMessage('Giao dịch không thành công, vui lòng thử lại!');
                }
            } catch (error) {
                console.error('Lỗi:', error.response?.data || error.message);
                setStatus('failed');
                setMessage(error.response?.data || 'Lỗi khi xử lý thanh toán VNPAY');
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
                    <a href="/">Thử lại</a>
                </div>
            )}
        </div>
    );
};

export default PaymentResult;
