import React from 'react';

const ProfileAddress = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Địa chỉ của bạn</h1>
      <p>123 Đường ABC, Phường DEF, Quận XYZ</p>
      <p>Thành phố: Hà Nội</p>
      <p>Mã bưu điện: 100000</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Chỉnh sửa địa chỉ
      </button>
    </div>
  );
};

export default ProfileAddress;
