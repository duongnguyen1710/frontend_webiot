import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">Giới thiệu</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Giới thiệu về shop
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Liên hệ với chúng tôi
              </a>
            </li>
           
        
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Chính sách</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Chính sách đổi trả
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Điều khoản dịch vụ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Kiểm tra đơn hàng
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">LINHKIENTOT</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Địa chỉ: 99A/147 Triều Khúc, Thanh Xuân, Hà Nội
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Email: nguyenduong171002@gmail.com
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Số điện thoại: 0336401099
              </a>
            </li>
          </ul>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
