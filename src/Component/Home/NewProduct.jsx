import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewProduct } from "../State/Product/Action";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../State/Cart/Action";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.product);
  const { jwt } = useSelector((state) => state.auth); // Lấy jwt từ state auth

  useEffect(() => {
    dispatch(getNewProduct({ id: 1 }));
  }, [dispatch]);

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

  const handleViewDetails = (productId) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <div className="bg-white">
      <ToastContainer /> {/* Thêm ToastContainer vào đây */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Sản phẩm mới nhất
        </h2>

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
                {product.price ? `${product.price} đ` : "Liên hệ để biết giá"}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => handleViewDetails(product.id)}
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
      </div>
    </div>
  );
};

export default NewProduct;
