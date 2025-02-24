import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductByRestaurantAndCategory,
  filterProductsByCategoryItem,
  getProductByRestaurantAndCategory1,
} from "../State/Product/Action";
import { addItemToCart } from "../State/Cart/Action";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryItems } from "../State/Category/Action";
import { toast, ToastContainer } from "react-toastify";
import { FiRefreshCcw } from "react-icons/fi";

const ProductByCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, restaurantId } = useParams();

  const categoryItems = useSelector(
    (state) => state.category.categoryItems || []
  );
  const products = useSelector((state) => state.product.products || []);
  const pagination = useSelector((state) => state.product.pagination);
  const isLoading = useSelector((state) => state.product.isLoading);

  const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageRange, setPageRange] = useState([0, 1, 2]); // Phạm vi trang hiển thị

  const priceRanges = [
    { id: 1, label: "Dưới 100,000đ", min: 0, max: 100000 },
    { id: 2, label: "100,000đ - 500,000đ", min: 100000, max: 500000 },
    { id: 3, label: "500,000đ - 1,000,000đ", min: 500000, max: 1000000 },
    { id: 4, label: "Trên 1,000,000đ", min: 1000000, max: 9999999999 },
  ];

  useEffect(() => {
    if (categoryId && restaurantId) {
      dispatch(
        getProductByRestaurantAndCategory1({
          categoryId,
          restaurantId,
          page: currentPage,
        })
      );
      dispatch(getCategoryItems({ categoryId, restaurantId }));
    }
  }, [categoryId, restaurantId, currentPage, dispatch]);

  const handleRefresh = () => {
    setSelectedCategoryItem(null);
    setSelectedPriceRange(null);
    setCurrentPage(0);
    setPageRange([0, 1, 2]); // Reset phân trang
    dispatch(
      getProductByRestaurantAndCategory1({ categoryId, restaurantId, page: 0 })
    );
    dispatch(getCategoryItems({ categoryId, restaurantId }));
  };

  const handleCategoryItemChange = (itemId) => {
    setSelectedCategoryItem(itemId);
    setSelectedPriceRange(null);
    setCurrentPage(0);
    setPageRange([0, 1, 2]);

    dispatch(
      filterProductsByCategoryItem({
        categoryItemId: itemId,
        minPrice: null,
        maxPrice: null,
      })
    );
  };

  const handlePriceRangeChange = (priceRange) => {
    if (!selectedCategoryItem) {
      toast.warn("Vui lòng chọn danh mục con trước khi lọc theo giá.");
      return;
    }

    setSelectedPriceRange(priceRange.id);
    setCurrentPage(0);
    setPageRange([0, 1, 2]);

    dispatch(
      filterProductsByCategoryItem({
        categoryItemId: selectedCategoryItem,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      })
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setCurrentPage(newPage);
      dispatch(
        getProductByRestaurantAndCategory({
          categoryId,
          restaurantId,
          page: newPage,
        })
      );

      if (newPage > pageRange[2]) {
        setPageRange([newPage - 1, newPage, newPage + 1]);
      } else if (newPage < pageRange[0]) {
        setPageRange([newPage - 1, newPage, newPage + 1]);
      }
    }
  };

  const handleAddToCart = (product) => {
    const jwt = localStorage.getItem("jwt");

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
      navigate("/login");
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
    <div className="flex min-h-screen bg-white">
      <ToastContainer />

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

        {selectedCategoryItem && (
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
        )}
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Sản phẩm theo danh mục</h1>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center">Không có sản phẩm nào</p>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <img
                    alt={product.imageAlt || "Product image"}
                    src={product.images[0] || "default-image-url.jpg"}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />

                  <h3 className="mt-4 text-sm font-medium text-gray-900">
                    {product.name || "Tên sản phẩm"}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {product.price
                      ? `${product.price} đ`
                      : "Liên hệ để biết giá"}
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
                      onClick={() => handleAddToCart(product)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {/* Nút Previous "<" */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-1 border rounded-md"
              >
                &lt;
              </button>

              {/* Hiển thị số trang */}
              {pageRange.map(
                (p) =>
                  p >= 0 &&
                  p < pagination.totalPages && (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`px-3 py-1 border rounded-md ${
                        currentPage === p ? "bg-gray-300" : ""
                      }`}
                    >
                      {p + 1}
                    </button>
                  )
              )}

              {/* Nút Next ">" */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage + 1 >= pagination.totalPages}
                className="px-3 py-1 border rounded-md"
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductByCategory;
