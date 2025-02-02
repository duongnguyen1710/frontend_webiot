// ProfilePersonalInfo.js
import React from 'react';

const ProfilePersonalInfo = () => {
  // Dữ liệu mẫu (thay thế bằng dữ liệu thực tế của bạn)
  const user = {
    avatar: 'https://via.placeholder.com/150', // Link ảnh avatar
    fullName: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">Thông tin cá nhân</h2>
      <div className="flex items-center space-x-6">
        {/* Avatar */}
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border border-gray-300 shadow-sm"
        />

        {/* Thông tin người dùng */}
        <div>
          <p className="text-lg font-semibold">{user.fullName}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePersonalInfo;
