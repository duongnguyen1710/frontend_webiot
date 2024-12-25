import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByRestaurantAndCategory } from '../State/Product/Action';
import { useNavigate, useParams } from 'react-router-dom';
import { addItemToCart } from '../State/Cart/Action';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { getCategoryItems } from '../State/Category/Action';

const ProductByCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, restaurantId } = useParams();
  const categoryItems = useSelector((state) => state.category.categoryItems || []);
  const products = useSelector((state) => state.product.products || []); // Danh sách sản phẩm
  const isLoading = useSelector((state) => state.product.isLoading); 

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số sản phẩm mỗi trang
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product) => {
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        productId: product.id,
        quantity: 1,
      },
    };

    dispatch(addItemToCart(reqData));
    console.log("req data", reqData);

    // Hiển thị thông báo thành công
    toast.success("Sản phẩm đã được thêm vào giỏ hàng!", {
      position: "top-right",
      autoClose: 3000, // Thời gian toast tự đóng (ms)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleViewDetails = (productId) => {
    navigate(`/detail/${productId}`);
  };

  useEffect(() => {
    if (categoryId && restaurantId) {
      dispatch(getProductByRestaurantAndCategory({ categoryId, restaurantId }));
      dispatch(getCategoryItems({ categoryId, restaurantId }));
    }
  }, [categoryId, restaurantId, dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer />
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Bộ lọc</h2>
        {/* Filter: Subcategories */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Danh mục con</h3>
          <ul>
            {categoryItems.map((item) => (
              <li key={item.id} className="mb-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* Filter: Price 
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Giá</h3>
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
        */}
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
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700">{product.price}đ</p>
                <div className="flex mt-4 space-x-2">
                  <button onClick={() => handleAddToCart(product)} className="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Thêm vào giỏ hàng
                  </button>
                  <button onClick={() => handleViewDetails(product.id)} className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
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
