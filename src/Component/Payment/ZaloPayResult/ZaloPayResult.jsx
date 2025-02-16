import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../Config/Api';

const ZaloPayResult = () => {
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

                // Chỉ lấy các trường cần thiết từ URL
                const queryParams = {
                    apptransid: searchParams.get("apptransid"),
                    bankcode: searchParams.get("bankcode"),
                    checksum: searchParams.get("checksum"),
                    pmcid: searchParams.get("pmcid"),
                    status: searchParams.get("status"),
                };

                console.log("🔍 Params gửi lên backend:", queryParams);

                if (!queryParams.apptransid) {
                    setStatus("failed");
                    setMessage("Không tìm thấy mã giao dịch từ ZaloPay.");
                    return;
                }

                // Gửi request đến API Backend
                const response = await api.get('/api/zalopay', {
                    params: queryParams,
                    headers: { Authorization: `Bearer ${jwt}` },
                });

                console.log('Phản hồi từ Backend:', response.data);

                // 🔹 Kiểm tra `statusPayment` từ API backend
                const statusPayment = response.data?.statusPayment;
                if (statusPayment === 1) {
                    setStatus('success');
                    setMessage('Thanh toán thành công, đơn hàng đã được cập nhật!');
                } else {
                    setStatus('failed');
                    setMessage('Thanh toán thất bại! Vui lòng thử lại.');
                }
            } catch (error) {
                console.error('❌ Lỗi:', error.response?.data || error.message);
                setStatus('failed');
                setMessage(error.response?.data?.message || 'Lỗi khi xử lý thanh toán ZaloPay');
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

export default ZaloPayResult;
