import React from 'react';

const ProfileOrders = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lịch sử đơn hàng</h1>
      <ul className="space-y-4">
        <li className="border p-4 rounded-md">
          <h2 className="font-bold">Đơn hàng #001</h2>
          <p>Ngày đặt: 2024-12-01</p>
          <p>Tình trạng: Đã giao</p>
        </li>
        <li className="border p-4 rounded-md">
          <h2 className="font-bold">Đơn hàng #002</h2>
          <p>Ngày đặt: 2024-12-10</p>
          <p>Tình trạng: Đang vận chuyển</p>
        </li>
        <li className="border p-4 rounded-md">
          <h2 className="font-bold">Đơn hàng #003</h2>
          <p>Ngày đặt: 2024-12-15</p>
          <p>Tình trạng: Chờ xử lý</p>
        </li>
      </ul>
    </div>
  );
};

export default ProfileOrders;
