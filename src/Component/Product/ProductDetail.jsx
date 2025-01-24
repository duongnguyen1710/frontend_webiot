import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../State/Product/Action";
import { addItemToCart } from "../State/Cart/Action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRatingsByProductId } from "../State/Rating/Action";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productDetails, loading, error } = useSelector(
    (state) => state.product
  );
  const { auth } = useSelector((state) => state);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductById(productId));
    dispatch(getRatingsByProductId(productId));
  }, [productId, dispatch]);

  const {
    ratings,
    loading: ratingLoading,
    error: ratingError,
  } = useSelector((state) => state.rating);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    const jwt = localStorage.getItem("jwt"); // Lấy jwt từ localStorage

    if (!jwt || jwt.trim() === "") {
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
      return;
    }

    if (!productDetails || !productDetails.id) {
      toast.error("Không thể thêm sản phẩm này vào giỏ hàng!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const reqData = {
      token: jwt,
      cartItem: {
        productId: productDetails.id,
        quantity,
      },
    };

    try {
      await dispatch(addItemToCart(reqData));
      toast.success("Sản phẩm đã được thêm vào giỏ hàng!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Thêm sản phẩm vào giỏ hàng thất bại. Vui lòng thử lại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleBuyNow = async () => {
    const jwt = localStorage.getItem("jwt"); // Lấy jwt từ localStorage

    if (!jwt || jwt.trim() === "") {
      toast.error("Bạn cần đăng nhập để mua sản phẩm!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
      return;
    }

    if (!productDetails || !productDetails.id) {
      toast.error("Không thể mua sản phẩm này!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const reqData = {
      token: jwt,
      cartItem: {
        productId: productDetails.id,
        quantity,
      },
    };

    try {
      await dispatch(addItemToCart(reqData));
      toast.success(
        "Sản phẩm đã được thêm vào giỏ hàng. Đang chuyển đến giỏ hàng...",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      navigate("/cart"); // Chuyển hướng đến trang giỏ hàng
    } catch (error) {
      toast.error("Thêm sản phẩm vào giỏ hàng thất bại. Vui lòng thử lại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const productImages = productDetails?.images || [];
  const productImage =
    productImages.length > 0
      ? productImages[0]
      : "https://via.placeholder.com/400";

  // const reviews = [
  //   {
  //     id: 1,
  //     stars: 5,
  //     comment: "Sản phẩm rất tốt, chất lượng tuyệt vời!",
  //     createdAt: "2025-01-12T10:30:00",
  //   },
  //   {
  //     id: 2,
  //     stars: 4,
  //     comment: "Hàng ổn nhưng giao hơi chậm.",
  //     createdAt: "2025-01-10T14:00:00",
  //   },
  //   {
  //     id: 3,
  //     stars: 3.5,
  //     comment: "Tạm ổn, giá hợp lý nhưng chất lượng trung bình.",
  //     createdAt: "2025-01-09T08:45:00",
  //   },
  // ];

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <ToastContainer />
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ flex: "1", marginRight: "20px" }}>
          <img
            src={productImage}
            alt="Product"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div style={{ flex: "2" }}>
          <h2>{productDetails?.name || "Tên sản phẩm"}</h2>
          <p>Giá: {productDetails?.price || "$100"}</p>
          <p>
            Mô tả: {productDetails?.description || "Đây là mô tả của sản phẩm."}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={decreaseQuantity}
              style={{ padding: "10px", marginRight: "10px" }}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={increaseQuantity}
              style={{ padding: "10px", marginLeft: "10px" }}
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Thêm vào giỏ hàng
          </button>
          <button onClick={handleBuyNow} style={{ padding: "10px 20px" }}>
            Mua ngay
          </button>
        </div>
      </div>
      <div>
        <h3>Mô tả chi tiết</h3>
        <p>
          {productDetails?.detailedDescription ||
            "Đây là mô tả chi tiết của sản phẩm. Bạn có thể thêm ảnh vào mô tả này."}
        </p>
        <img
          src={productImage}
          alt="Description Image"
          style={{ width: "100%", borderRadius: "10px", marginTop: "10px" }}
        />
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Đánh giá sản phẩm</h3>
        <div style={{ borderTop: "1px solid #ddd", paddingTop: "10px" }}>
          {ratingLoading ? (
            <p>Đang tải đánh giá...</p>
          ) : ratingError ? (
            // Nếu ratingError là object, render key "message" hoặc chuỗi mặc định
            <p style={{ color: "red" }}>
              {typeof ratingError === "object" && ratingError.message
                ? ratingError.message
                : "Có lỗi xảy ra khi tải đánh giá!"}
            </p>
          ) : ratings && ratings.length > 0 ? (
            ratings.map((review) => (
              <div
                key={review.id}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <strong style={{ marginRight: "10px" }}>Số sao:</strong>
                  <span style={{ color: "#FFD700", fontWeight: "bold" }}>
                    {"★".repeat(Math.floor(review.stars))}
                    {review.stars % 1 !== 0 && "★"}
                  </span>
                  <span style={{ marginLeft: "10px" }}>
                    ({review.stars.toFixed(1)} / 5)
                  </span>
                </div>
                <p style={{ marginTop: "10px" }}>
                  <strong>Nhận xét:</strong> {review.comment}
                </p>
                <p style={{ fontSize: "12px", color: "#666" }}>
                  <strong>Ngày tạo:</strong>{" "}
                  {review.createAt
                    ? review.createAt.split(" ")[0]
                    : "Không xác định"}
                </p>
              </div>
            ))
          ) : (
            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
