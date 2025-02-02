import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByRestaurantAndCategory, filterProductsByCategoryItem, getProductByRestaurantAndCategory1 } from "../State/Product/Action";
import { addItemToCart } from "../State/Cart/Action";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryItems } from "../State/Category/Action";
import { toast, ToastContainer } from "react-toastify";
import { FiRefreshCcw } from "react-icons/fi";

const ProductByCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, restaurantId } = useParams();

  const categoryItems = useSelector((state) => state.category.categoryItems || []);
  const products = useSelector((state) => state.product.products || []);
  const pagination = useSelector((state) => state.product.pagination);
  const isLoading = useSelector((state) => state.product.isLoading);

  const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const priceRanges = [
    { id: 1, label: "Dưới 100,000đ", min: 0, max: 100000 },
    { id: 2, label: "100,000đ - 500,000đ", min: 100000, max: 500000 },
    { id: 3, label: "500,000đ - 1,000,000đ", min: 500000, max: 1000000 },
    { id: 4, label: "Trên 1,000,000đ", min: 1000000, max: Infinity },
  ];

  // Fetch initial data
  useEffect(() => {
    if (categoryId && restaurantId) {
      dispatch(getProductByRestaurantAndCategory1({ categoryId, restaurantId, page: currentPage }));
      dispatch(getCategoryItems({ categoryId, restaurantId }));
    }
  }, [categoryId, restaurantId, currentPage, dispatch]);

  // Refresh Page
  const handleRefresh = () => {
    setSelectedCategoryItem(null);
    setSelectedPriceRange(null);
    setCurrentPage(0);
    dispatch(getProductByRestaurantAndCategory1({ categoryId, restaurantId, page: 0 }));
    dispatch(getCategoryItems({ categoryId, restaurantId }));
  };

  // Filter by category item
  const handleCategoryItemChange = (itemId) => {
    setSelectedCategoryItem(itemId);
    setCurrentPage(0); // Reset về trang đầu khi lọc

    dispatch(
      filterProductsByCategoryItem({
        categoryItemId: itemId,
        minPrice: selectedPriceRange
          ? priceRanges.find((range) => range.id === selectedPriceRange)?.min
          : null,
        maxPrice: selectedPriceRange
          ? priceRanges.find((range) => range.id === selectedPriceRange)?.max
          : null,
      })
    );
  };

  // Filter by price range
  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange.id);
    setCurrentPage(0); // Reset về trang đầu khi lọc

    dispatch(
      filterProductsByCategoryItem({
        categoryItemId: selectedCategoryItem,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      })
    );
  };

  // Pagination
  const handlePageChange = (page) => {
    if (page >= 0 && page < pagination.totalPages) {
      setCurrentPage(page);
      dispatch(getProductByRestaurantAndCategory({ categoryId, restaurantId, page }));
    }
  };

  const handleAddToCart = (product) => {
    const jwt = localStorage.getItem("jwt"); // Lấy jwt từ localStorage
      
        if (!jwt || jwt.trim() === "") {
          toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/login"); // Chuyển hướng đến trang đăng nhập
          return;
        }
      
        const reqData = {
          token: jwt,
          cartItem: {
            productId: product.id,
            quantity: 1,
          },
        };
      
        dispatch(addItemToCart(reqData));
        console.log("req data", reqData);
      
        toast.success("Sản phẩm đã được thêm vào giỏ hàng!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer />

      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Bộ lọc</h2>
          <button
            onClick={handleRefresh}
            className="text-gray-600 hover:text-blue-500"
            title="Làm mới"
          >
            <FiRefreshCcw size={20} />
          </button>
        </div>

        {/* Filter: Subcategories */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Danh mục con</h3>
          <ul>
            {categoryItems.map((item) => (
              <li key={item.id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="subcategory"
                    className="mr-2"
                    checked={selectedCategoryItem === item.id}
                    onChange={() => handleCategoryItemChange(item.id)}
                  />
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Filter: Price */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Giá</h3>
          <ul>
            {priceRanges.map((priceRange) => (
              <li key={priceRange.id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    className="mr-2"
                    checked={selectedPriceRange === priceRange.id}
                    onChange={() => handlePriceRangeChange(priceRange)}
                  />
                  {priceRange.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Sản phẩm theo danh mục</h1>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center">Không có sản phẩm nào</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
                {/* Kiểm tra ảnh trước khi hiển thị */}
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Không có ảnh</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-700">{product.price}đ</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
              
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
              <span>Page {currentPage + 1} / {pagination.totalPages}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage + 1 >= pagination.totalPages}>Next</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductByCategory;
