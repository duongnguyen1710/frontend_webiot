import React from 'react'

const ProductReview = () => {
   // Dữ liệu mẫu cho đánh giá
   const reviews = [
    {
      id: 1,
      stars: 5,
      comment: "Sản phẩm rất tốt, chất lượng tuyệt vời!",
      createdAt: "2025-01-12T10:30:00",
    },
    {
      id: 2,
      stars: 4,
      comment: "Hàng ổn nhưng giao hơi chậm.",
      createdAt: "2025-01-10T14:00:00",
    },
    {
      id: 3,
      stars: 3.5,
      comment: "Tạm ổn, giá hợp lý nhưng chất lượng trung bình.",
      createdAt: "2025-01-09T08:45:00",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Đánh giá sản phẩm</h2>
      <div style={{ borderTop: "1px solid #ddd", paddingTop: "10px" }}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
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
                  {review.stars % 1 !== 0 && "★"} {/* Nếu có phần thập phân, hiển thị thêm nửa sao */}
                </span>
                <span style={{ marginLeft: "10px" }}>
                  ({review.stars.toFixed(1)} / 5)
                </span>
              </div>
              <p style={{ marginTop: "10px" }}><strong>Nhận xét:</strong> {review.comment}</p>
              <p style={{ fontSize: "12px", color: "#666" }}>
                <strong>Ngày tạo:</strong> {new Date(review.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        )}
      </div>
    </div>
  );
};

export default ProductReview
