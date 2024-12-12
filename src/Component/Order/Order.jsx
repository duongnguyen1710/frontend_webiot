import React, { useState } from 'react';

const Order = () => {
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([
    '123 Đường A, Thành phố B',
    '456 Đường C, Thành phố D',
    '789 Đường E, Thành phố F',
  ]); // Danh sách địa chỉ mẫu

  const cartProducts = [
    { id: 1, name: 'Product 1', price: '100$', quantity: 2 },
    { id: 2, name: 'Product 2', price: '200$', quantity: 1 },
    { id: 3, name: 'Product 3', price: '150$', quantity: 3 },
  ]; // Dữ liệu mẫu từ giỏ hàng

  const handleSelectAddress = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  const totalAmount = cartProducts.reduce((total, product) => {
    const price = parseFloat(product.price.replace('$', ''));
    return total + price * product.quantity;
  }, 0);

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Left: Address Selection */}
      <div className="w-1/3 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Chọn địa chỉ</h2>
        <ul>
          {addresses.map((addr, index) => (
            <li key={index} className="mb-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="address"
                  className="mr-2"
                  value={addr}
                  checked={address === addr}
                  onChange={() => handleSelectAddress(addr)}
                />
                {addr}
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Thêm địa chỉ mới</h3>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Nhập địa chỉ mới"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            onClick={() =>
              setAddresses((prev) => [...prev, address]) || setAddress('')
            }
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Thêm
          </button>
        </div>
      </div>

      {/* Right: Cart Products */}
      <div className="w-2/3 bg-white shadow-md rounded-lg ml-6 p-4">
        <h2 className="text-lg font-bold mb-4">Sản phẩm trong giỏ hàng</h2>
        <div className="space-y-4">
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h3 className="text-md font-semibold">{product.name}</h3>
                <p className="text-gray-700">Giá: {product.price}</p>
                <p className="text-gray-700">Số lượng: {product.quantity}</p>
              </div>
              <p className="text-gray-800 font-bold">
                ${(parseFloat(product.price.replace('$', '')) * product.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-bold">Tổng cộng: ${totalAmount.toFixed(2)}</h3>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Xác nhận đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
