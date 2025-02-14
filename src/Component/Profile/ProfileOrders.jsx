import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders, reorderOrder } from "../State/Orders/Action";
import { createRating } from "../State/Rating/Action";
import { getUserAddresses } from "../State/Address/Action";

const ProfileOrders = () => {
  const dispatch = useDispatch(); // Khai báo dispatch trước khi dùng nó
  const [orderDate, setOrderDate] = useState(
    new Date().toLocaleDateString("vi-VN")
  );

  const { addresses } = useSelector((state) => state.address);

  const [selectedAddressId, setSelectedAddressId] = useState(""); // Lưu địa chỉ được chọn

  const [showReorderPopup, setShowReorderPopup] = useState(false); // Hiển thị popup mua lại
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu đơn hàng được chọn
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // Lưu phương thức thanh toán

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserAddresses(jwt)); // Gọi API lấy danh sách địa chỉ
    }
  }, [dispatch, showReorderPopup]); // Chạy lại khi popup mở

  const openReorderPopup = (order) => {
    setSelectedOrder(order);
    setShowReorderPopup(true);
  };

  const handleReorder = async (orderId) => {
    if (!selectedPaymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (!selectedAddressId) {
      alert("Vui lòng chọn địa chỉ giao hàng!");
      return;
    }

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      alert("Bạn cần đăng nhập để mua lại.");
      return;
    }

    try {
      await dispatch(
        reorderOrder(orderId, selectedPaymentMethod, selectedAddressId, jwt)
      );
      alert("Mua lại thành công! Vui lòng kiểm tra đơn hàng.");
      setShowReorderPopup(false); // Đóng popup sau khi mua lại
    } catch (error) {
      alert("Có lỗi xảy ra: " + error.message);
    }
  };

  const { orders, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.orders
  );

  const paymentMethods = {
    1: "VnPay",
    3: "Stripe",
    4: "Tiền mặt",
  };

  const [showPopup, setShowPopup] = useState(false); // Hiển thị pop-up
  const [ratingStars, setRatingStars] = useState(5); // Số sao
  const [ratingComment, setRatingComment] = useState(""); // Nhận xét
  const [currentProduct, setCurrentProduct] = useState(null); // Sản phẩm hiện tại để đánh giá
  const [createAt, setCreateAt] = useState(null);

  const handleSubmitRating = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      alert("Bạn cần đăng nhập để gửi đánh giá.");
      return;
    }

    try {
      const ratingData = {
        stars: ratingStars,
        comment: ratingComment,
        createAt, // Gửi thời gian tạo đánh giá
      };

      // Gửi đánh giá thông qua action
      await dispatch(createRating(currentProduct.id, ratingData, jwt));
      alert("Đánh giá đã được gửi thành công!");
      setShowPopup(false); // Đóng pop-up sau khi gửi thành công
    } catch (error) {
      alert("Gửi đánh giá thất bại. Vui lòng thử lại.");
    }
  };

  const handleOpenPopup = (product) => {
    setCurrentProduct(product); // Lưu sản phẩm hiện tại
    setCreateAt(new Date().toISOString()); // Lấy thời gian hiện tại
    setShowPopup(true); // Mở pop-up
  };

  const [page, setPage] = useState(0); // Trang hiện tại
  const [pageRange, setPageRange] = useState([0, 1, 2]); // Phạm vi các trang hiển thị

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUsersOrders(jwt, page, 5)); // Mặc định mỗi trang 5 đơn hàng
    }
  }, [dispatch, page]);

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);

      // Cập nhật phạm vi trang
      if (newPage > pageRange[2]) {
        setPageRange([newPage - 1, newPage, newPage + 1]);
      } else if (newPage < pageRange[0]) {
        setPageRange([newPage - 1, newPage, newPage + 1]);
      }
    }
  };

  if (loading) {
    return <p>Đang tải lịch sử đơn hàng...</p>;
  }

  if (error) {
    console.error("Error:", error);
    return (
      <p className="text-red-500">
        Lỗi:{" "}
        {typeof error === "object" ? error.message || "Có lỗi xảy ra!" : error}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lịch sử đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {orders.map((order, index) => (
              <li key={index} className="border p-4 rounded-md shadow-md">
                {/* <h2 className="font-bold text-lg">Đơn hàng #{index + 1}</h2> */}
                <p>
                  <strong>Ngày đặt:</strong>{" "}
                  {new Date(order.createAt).toLocaleDateString("vi-VN")}
                </p>
                <p>
                  <strong>Tình trạng:</strong> {order.orderStatus}
                </p>
                {order.orderStatus === "Hoàn thành" && (
                  <button
                    onClick={() => openReorderPopup(order)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Mua lại
                  </button>
                )}

                <p>
                  <strong>Thanh toán:</strong>{" "}
                  {order.statusPayment ? "Đã thanh toán" : "Chưa thanh toán"}
                </p>
                <p>
                  <strong>Phương thức thanh toán:</strong>{" "}
                  {paymentMethods[order.paymentType] || "Không xác định"}
                </p>
                <p>
                  <strong>Tổng tiền:</strong>{" "}
                  {order.totalPrice.toLocaleString()} VND
                </p>

                <h3 className="font-semibold mt-2">Địa chỉ giao hàng:</h3>
                <p>
                  {order.deliveryAddress?.street || "N/A"},{" "}
                  {order.deliveryAddress?.city || "N/A"},{" "}
                  {order.deliveryAddress?.province || "N/A"}
                </p>

                <h3 className="font-semibold mt-2">Sản phẩm:</h3>
                <ul className="list-disc ml-6">
                  {order.items?.map((item, idx) => (
                    <li key={idx} className="mt-1 flex items-center">
                      <img
                        src={
                          item.product?.images?.[0] ||
                          "https://via.placeholder.com/100"
                        }
                        alt={item.product?.name || "Hình ảnh sản phẩm"}
                        width="100"
                        className="mt-1 rounded-md"
                      />
                      <div className="ml-4">
                        <strong>
                          {item.product?.name || "Tên sản phẩm không xác định"}
                        </strong>
                        <p>
                          {item.quantity || 0} x{" "}
                          {item.product?.price
                            ? item.product.price.toLocaleString()
                            : "0"}{" "}
                          VND
                        </p>
                        {/* Nút đánh giá */}
                        {order.orderStatus === "Hoàn thành" && (
                          <button
                            onClick={() => handleOpenPopup(item.product)}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          >
                            Đánh giá sản phẩm
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* Phân Trang */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="px-3 py-1 border rounded-md"
            >
              &lt;
            </button>

            {pageRange.map(
              (p) =>
                p >= 0 &&
                p < totalPages && (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`px-3 py-1 border rounded-md ${
                      page === p ? "bg-gray-300" : ""
                    }`}
                  >
                    {p + 1}
                  </button>
                )
            )}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
              className="px-3 py-1 border rounded-md"
            >
              &gt;
            </button>
          </div>
        </>
      )}

      {/* Popup Đánh Giá */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Đánh giá sản phẩm: {currentProduct?.name}
            </h2>

            {/* Phần thời gian */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Thời gian đánh giá:
              </label>
              <p className="text-gray-600">
                {new Date(createAt).toLocaleString("vi-VN")}
              </p>
            </div>

            {/* Phần chọn số sao */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Số sao:</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRatingStars(star)}
                    style={{
                      cursor: "pointer",
                      color: star <= ratingStars ? "#FFD700" : "#CCCCCC",
                      fontSize: "24px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Phần nhận xét */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Nhận xét:</label>
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                rows="4"
                className="w-full mt-2 p-2 border rounded"
              ></textarea>
            </div>

            {/* Nút gửi hoặc hủy */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitRating}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      )}

      {showReorderPopup && selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Mua lại đơn hàng</h2>

            {/* Hiển thị thông tin đơn hàng */}
            <p>
              <strong>Ngày đặt:</strong> {orderDate}{" "}
              {/* Luôn hiển thị ngày hôm nay */}
            </p>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              {selectedOrder.totalPrice.toLocaleString()} VND
            </p>

            {/* Hiển thị danh sách ảnh sản phẩm */}
            <h3 className="font-semibold mt-2">Sản phẩm trong đơn hàng:</h3>
            <div className="flex overflow-x-auto space-x-2 py-2">
              {selectedOrder.items.map((item, idx) => (
                <img
                  key={idx}
                  src={
                    item.product?.images?.[0] ||
                    "https://via.placeholder.com/100"
                  }
                  alt={item.product?.name || "Hình ảnh sản phẩm"}
                  className="w-16 h-16 object-cover rounded-md shadow-md"
                />
              ))}
            </div>

            {/* Chọn địa chỉ giao hàng */}
            <label className="block mb-2 font-semibold">
              Chọn địa chỉ giao hàng:
            </label>
            <select
              value={selectedAddressId}
              onChange={(e) => setSelectedAddressId(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">-- Chọn địa chỉ --</option>
              {addresses && addresses.length > 0 ? (
                addresses.map((addr) => (
                  <option key={addr.id} value={addr.id}>
                    {`${addr.fullName} - ${addr.fullAddress}, ${addr.city}, ${addr.province}`}
                  </option>
                ))
              ) : (
                <option value="">Không có địa chỉ nào</option>
              )}
            </select>

            {/* Chọn phương thức thanh toán */}
            <label className="block mb-2 font-semibold">
              Chọn phương thức thanh toán:
            </label>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">-- Chọn phương thức --</option>
              <option value="vnpay">VNPay</option>
              <option value="stripe">Stripe</option>
              <option value="zalopay">ZaloPay</option>
              <option value="momo">Momo</option>
            </select>

            {/* Nút xác nhận hoặc hủy */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowReorderPopup(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Hủy
              </button>
              <button
                onClick={() => handleReorder(selectedOrder.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Xác nhận mua lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOrders;
