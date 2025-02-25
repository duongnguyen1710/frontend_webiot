import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../State/Category/Action";
import { getAllProducts } from "../State/Product/Action";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 9; // Số sản phẩm mỗi trang

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  // Lấy danh mục từ Redux store
  const { category, isLoading: isLoadingCategory } = useSelector(
    (state) => state.category
  );

  // Lấy sản phẩm từ Redux store
  const { products, pagination, isLoading: isLoadingProducts } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getCategory({ id: 1 })); // Gọi API lấy danh mục
    dispatch(getAllProducts(currentPage, ITEMS_PER_PAGE)); // Gọi API lấy toàn bộ sản phẩm có phân trang
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setCurrentPage(newPage);
      dispatch(getAllProducts(newPage, ITEMS_PER_PAGE));
    }
  };

  const handleProductByCategory = (categoryId) => {
    navigate(`/product/${categoryId}/1`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <ToastContainer />
      
      {/* Sidebar danh mục */}
      <aside className="w-1/4 bg-white shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Danh mục</h2>
        </div>

        {/* Kiểm tra nếu đang tải danh mục */}
        {isLoadingCategory ? (
          <p>Đang tải danh mục...</p>
        ) : (
          <ul>
            {category?.length > 0 ? (
              category.map((item) => (
                <li key={item.id} className="mb-2">
                  <button
                    className="block p-2 rounded-md hover:bg-gray-200 cursor-pointer text-left w-full"
                    onClick={() => handleProductByCategory(item.id)}
                  >
                    {item.name}
                  </button>
                </li>
              ))
            ) : (
              <p>Không có danh mục nào</p>
            )}
          </ul>
        )}
      </aside>

      {/* Danh sách sản phẩm */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>

        {isLoadingProducts ? (
          <p className="text-center">Đang tải sản phẩm...</p>
        ) : products.length === 0 ? (
          <p className="text-center">Không có sản phẩm nào</p>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <img
                    alt={product.name}
                    src={product.images[0] || "https://via.placeholder.com/200"}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <h3 className="mt-4 text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {product.price ? `${product.price.toLocaleString()} đ` : "Liên hệ để biết giá"}
                  </p>

                  <div className="mt-4 flex justify-between">
                    <button
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() => navigate(`/detail/${product.id}`)}
                    >
                      Xem chi tiết
                    </button>
                    <button
                      className="text-sm text-green-600 hover:underline"
                      onClick={() => toast.success("Thêm vào giỏ hàng thành công!")}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Phân trang */}
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
              >
                &lt; Trước
              </button>

              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === index ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage + 1 >= pagination.totalPages}
                className="px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
              >
                Sau &gt;
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductList;
