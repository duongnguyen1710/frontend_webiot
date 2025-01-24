import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProfileAddress from './ProfileAddress';
import ProfileOrders from './ProfileOrders';
import { useEffect } from 'react';
import ProfilePersonalInfo from './ProfilePersonalInfo';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/profile') {
      navigate('/profile/personalInfo');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)]">
      <div className="lg:flex h-full">
        {/* Sidebar */}
        <div className="lg:w-[20%] bg-gray-100 h-[calc(100vh-128px)] overflow-y-auto p-4">
          <h2 className="text-lg font-bold mb-4">Menu</h2>
          <ul className="space-y-4">
            <li
              onClick={() => navigate('/profile/personalInfo')}
              className={`cursor-pointer p-2 rounded-md ${
                location.pathname === '/profile/personalInfo' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Thông tin cá nhân
            </li>
            <li
              onClick={() => navigate('/profile/address')}
              className={`cursor-pointer p-2 rounded-md ${
                location.pathname === '/profile/address' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Địa chỉ
            </li>
            <li
              onClick={() => navigate('/profile/orders')}
              className={`cursor-pointer p-2 rounded-md ${
                location.pathname === '/profile/orders' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Đơn hàng
            </li>
          </ul>
        </div>

        {/* Nội dung chính */}
        <div className="lg:w-[80%] h-[calc(100vh-128px)] overflow-y-auto p-4 bg-white">
          <Routes>
            <Route path="/personalInfo" element={<ProfilePersonalInfo />} />
            <Route path="/address" element={<ProfileAddress />} />
            <Route path="/orders" element={<ProfileOrders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;
