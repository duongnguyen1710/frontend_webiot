import React, { useState } from 'react';

const ProductByCategory = () => {
  const categories = ['Sub-category 1', 'Sub-category 2', 'Sub-category 3']; // Các danh mục con
  const priceFilters = ['0 - 100$', '100$ - 500$', '500$ - 1000$']; // Filter theo giá
  const allProducts = [
    { id: 1, name: 'Product 1', price: '100$', image: '/path/to/image1.jpg' },
    { id: 2, name: 'Product 2', price: '200$', image: '/path/to/image2.jpg' },
    { id: 3, name: 'Product 3', price: '300$', image: '/path/to/image3.jpg' },
    { id: 4, name: 'Product 4', price: '400$', image: '/path/to/image4.jpg' },
    { id: 5, name: 'Product 5', price: '500$', image: '/path/to/image5.jpg' },
    { id: 6, name: 'Product 6', price: '600$', image: '/path/to/image6.jpg' },
    { id: 7, name: 'Product 7', price: '700$', image: '/path/to/image7.jpg' },
    { id: 8, name: 'Product 8', price: '800$', image: '/path/to/image8.jpg' },
    { id: 9, name: 'Product 9', price: '900$', image: '/path/to/image9.jpg' },
  ]; // Dữ liệu mẫu cho sản phẩm

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số sản phẩm mỗi trang
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const products = allProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Bộ lọc</h2>
        {/* Filter: Subcategories */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Danh mục con</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="mb-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* Filter: Price */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Lọc theo giá</h3>
          <ul>
            {priceFilters.map((filter, index) => (
              <li key={index} className="mb-2">
                <label className="flex items-center">
                  <input type="radio" name="price" className="mr-2" />
                  {filter}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Category Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Tên danh mục</h1>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700">{product.price}</p>
                <div className="flex mt-4 space-x-2">
                  <button className="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Thêm vào giỏ hàng
                  </button>
                  <button className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-400`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductByCategory;
