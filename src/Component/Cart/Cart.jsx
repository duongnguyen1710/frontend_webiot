import React, { useEffect, useState } from "react";
import {
  Card,
  Divider,
  Button,
  Modal,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCartItem } from "../State/Cart/Action";
import { CartItem } from "./CartItem";
import { Address } from "./Address";
import { createOrder } from "../State/Orders/Action";
import {
  createAddress,
  fetchAddresses,
  getAllUserAddresses,
} from "../State/Address/Action";
import { Field, Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  fullName: "",
  phone: "",
  fullAddress: "",
  street: "",
  city: "",
  province: "",
  pincode: "",
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const { cart, address } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  // Fetch danh sách địa chỉ khi component mount
  useEffect(() => {
    if (jwt) {
      dispatch(fetchAddresses(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (jwt) {
      dispatch(getAllUserAddresses(jwt)); // Gọi API lấy danh sách tất cả địa chỉ
    }
  }, [dispatch, jwt]);

  const handleOpenAddressModal = () => {
    console.log("Open Address Modal clicked"); // Kiểm tra trong console
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Tính tổng tiền giỏ hàng
  const calculateTotalPrice = () => {
    return cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const shippingFee = 30000; // Phí ship cố định

  const handleSubmit = (values, { resetForm }) => {
    const addressData = {
      fullName: values.fullName,
      phone: values.phone,
      fullAddress: values.fullAddress,
      street: values.street,
      city: values.city,
      province: values.province,
      pincode: values.pincode,
    };

    dispatch(createAddress(addressData, jwt))
      .then(() => {
        dispatch(fetchAddresses(jwt));
        resetForm();
        handleClose();
      })
      .catch((error) => {
        console.error("Failed to create address:", error);
      });
  };

  const handleOrder = () => {
    if (!selectedAddress || !paymentMethod) {
      toast.warn("Chọn địa chỉ và phương thức thanh toán trước khi thanh toán.");
      return;
    }

    const orderData = {
      restaurantId: cart.cartItems[0]?.product?.restaurant?.id || 1,
      deliveryAddress: {
        id: selectedAddress.id,
        fullName: selectedAddress.fullName,
        phone: selectedAddress.phone,
        fullAddress: selectedAddress.fullAddress,
        street: selectedAddress.street,
        city: selectedAddress.city,
        province: selectedAddress.province,
        pincode: selectedAddress.pincode,
      },
      paymentMethod: paymentMethod,
    };

    dispatch(createOrder({ order: orderData, jwt }))
      .then(() => {
        if (paymentMethod === "cod") {
          toast.success("Đặt hàng thành công!");
          setTimeout(() => {
            navigate("/"); // Chuyển hướng về trang chủ
          }, 2000); // Chờ 2 giây trước khi chuyển hướng
        }
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
        console.error("Order creation failed:", error);
      });
  };

  return (
    <div>
       <ToastContainer />
      <main className="lg:flex justify-between">
        {/* Cart Items Section */}
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          {/* Chi Tiết Đơn Hàng */}
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Chi tiết đơn hàng</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-500">
                <p>Tổng tiền:</p>
                <p>{calculateTotalPrice()} VNĐ</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Phí ship:</p>
                <p>{shippingFee} VNĐ</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-500 font-bold">
                <p>Tổng cộng:</p>
                <p>{calculateTotalPrice() + shippingFee} VNĐ</p>
              </div>
            </div>
          </div>
        </section>

        {/* Address Selection Section */}
        <section className="lg:w-[70%] px-5 pb-10 lg:pb-0">
          <h1 className="text-center font-semibold text-2xl py-10">ĐỊA CHỈ</h1>

          {/* Dropdown danh sách địa chỉ */}
          <FormControl fullWidth className="mb-4">
            <InputLabel>Chọn địa chỉ</InputLabel>
            <Select
              value={selectedAddress}
              onChange={(e) =>
                setSelectedAddress(
                  address.addresses.find((addr) => addr.id === e.target.value)
                )
              }
              fullWidth
            >
              {address.addresses.map((addr) => (
                <MenuItem key={addr.id} value={addr.id}>
                  {`${addr.fullName} - ${addr.fullAddress}, ${addr.city}, ${addr.province}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedAddress && (
            <div className="bg-gray-100 p-5 rounded-md shadow-md mt-5 text-center">
              <h2 className="font-semibold mb-2">
                Thông Tin Địa Chỉ Giao Hàng
              </h2>
              <div className="text-left space-y-2 mb-4">
                <p>
                  <strong>Họ và Tên:</strong> {selectedAddress.fullName}
                </p>
                <p>
                  <strong>Số Điện Thoại:</strong> {selectedAddress.phone}
                </p>
                <p>
                  <strong>Địa Chỉ:</strong> {selectedAddress.fullAddress}
                </p>
                <p>
                  <strong>Đường:</strong> {selectedAddress.street}
                </p>
                <p>
                  <strong>Thành Phố:</strong> {selectedAddress.city}
                </p>
                <p>
                  <strong>Tỉnh:</strong> {selectedAddress.province}
                </p>
                <p>
                  <strong>Mã Bưu Điện:</strong> {selectedAddress.pincode}
                </p>
              </div>

              <h2 className="font-semibold mb-2">
                Chọn Phương Thức Thanh Toán
              </h2>
              <FormControl fullWidth className="mb-4">
                <InputLabel>Phương thức thanh toán</InputLabel>
                <Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <MenuItem value="stripe">Stripe</MenuItem>
                  <MenuItem value="vnpay">VNPay</MenuItem>
                  <MenuItem value="cod">Thanh toán khi nhận hàng</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleOrder}
              >
                Tiến Hành Thanh Toán
              </Button>
            </div>
          )}
        </section>
      </main>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2 className="font-semibold text-xl mb-4 text-center">
            Thêm Địa Chỉ
          </h2>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="fullName"
                    label="Họ và tên"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="phone"
                    label="Số điện thoại"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="fullAddress"
                    label="Địa chỉ chi tiết"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField} name="street" label="Đường" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="Thành phố"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="province"
                    label="Tỉnh"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Mã bưu điện"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Thêm Địa Chỉ
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
