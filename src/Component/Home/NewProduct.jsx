import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewProduct } from "../State/Product/Action"; // Import action từ Redux
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../State/Cart/Action";


const NewProduct = ({item}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Lấy danh sách sản phẩm từ Redux store
  const { products } = useSelector((state) => state.product); // Lấy từ state.product.products

  useEffect(() => {
    dispatch(getNewProduct({ id: 1 })); // Lấy sản phẩm mới từ API
  }, [dispatch]);

  const handleAddToCart=(e)=>{
    e.preventDefault()
    const reqData = {
      token:localStorage.getItem("jwt"),
      cartItem:{
      productId:item.id,
      quantity:1,
      },
    };
    dispatch(addItemToCart(reqData))
    console.log("req data",reqData)
  };

  const handleViewDetails = (productId) => {
    console.log("Hehe");
    navigate(`/detail/${productId}`);
     // Điều hướng đến trang chi tiết sản phẩm
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Sản phẩm nổi bật</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.imageAlt || "Product image"}
                src={product.images[0]} // Placeholder nếu thiếu ảnh
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              {/* <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name || "Tên sản phẩm"}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price || "0 đ"}
                </p>
              </div> */}
              console.log("dog")
              <div className="mt-4 flex justify-between">
                {/* Nút Xem chi tiết */}
                
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => handleViewDetails(product.id)}
                >
                  Xem chi tiết
                </button>
                {/* Nút Thêm vào giỏ hàng */}
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
}
export default NewProduct;