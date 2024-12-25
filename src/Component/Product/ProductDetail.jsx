import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../State/Product/Action';

const ProductDetail = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.product); // Lấy sản phẩm từ Redux store
  
  const [quantity, setQuantity] = useState(1);
  console.log("here",productId)

  useEffect(() => {

    dispatch(getProductById(productId)); // Gọi API để lấy thông tin chi tiết sản phẩm
  }, []);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', border: '1px solid #ddd', borderRadius: '10px' }}>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <img src={productDetails?.images[0] || "https://via.placeholder.com/400"} alt="Product" style={{ width: '100%', borderRadius: '10px' }} />
        </div>
        <div style={{ flex: '2' }}>
          <h2>{productDetails?.name || "Tên sản phẩm"}</h2>
          <p>Giá: {productDetails?.price || "$100"}</p>
          <p>Mô tả: {productDetails?.description || "Đây là mô tả của sản phẩm."}</p>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <button onClick={decreaseQuantity} style={{ padding: '10px', marginRight: '10px' }}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity} style={{ padding: '10px', marginLeft: '10px' }}>+</button>
          </div>
          <button style={{ padding: '10px 20px', marginRight: '10px' }}>Thêm vào giỏ hàng</button>
          <button style={{ padding: '10px 20px' }}>Mua ngay</button>
        </div>
      </div>
      <div>
        <h3>Mô tả chi tiết</h3>
        <p>{productDetails?.detailedDescription || "Đây là mô tả chi tiết của sản phẩm. Bạn có thể thêm ảnh vào mô tả này."}</p>
        <img src={productDetails?.images[0]} alt="Description Image" style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />
      </div>
    </div>
  );
};

export default ProductDetail;