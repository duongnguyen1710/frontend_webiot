import {
  Card,
  Divider,
  Button,
  Modal,
  Box,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import React from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCartItem } from "../State/Cart/Action";
import { CartItem } from "./CartItem";
import { Address } from "./Address";
import { createOrder } from "../State/Orders/Action";
// import * as Yup from "Yup";

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
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
  paymentMethod: "",
};

// const validationSchema = Yup.object.shape({
//   streetAddress: Yup.string().required("street address is required"),
//   state: Yup.string().required("state is required"),
//   pincode: Yup.string().required("pincode is required"),
//   city: Yup.string().required("city is required"),
// });

const Cart = ({ item }) => {
  const createOrderUsingSelectedAdress = () => {};
  const handleOpenAddressModal = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const jwt = localStorage.getItem("jwt");
  const handleUpdateCartItem = (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem();
    }
    const data = { cartItemId: item.id, quantity: item.quantity + value };
    dispatch(updateCartItem({ data, jwt }));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
  };

  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].product?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "Việt Nam",
        },
        paymentMethod: values.paymentMethod, // Add this line to send payment method
      },
    };
    dispatch(createOrder(data));
    console.log("form value", values);
  };

  return (
    <div>
      <main className="lg:flex justify-between ">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem item={item} />
          ))}
          <Divider />
          <div className="billlDetails px-5 text-sm">
            <p className="font-extralight py-5 "> Chi tiết đơn hàng</p>
            <div className="space-y-3">
              <div className="flex justify-between text gray-500">
                <p>Tổng tiền</p>
                <p>{cart.cart?.total}VNĐ</p>
              </div>

              <div className="flex justify-between text gray-400">
                <p>Phí ship</p>
                <p>30000VNĐ</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Tổng</p>
              <p>{cart.cart?.total + 30000}VNĐ</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              ĐỊA CHỈ
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[].map((item) => (
                <Address
                  handleSelectAddress={createOrderUsingSelectedAdress}
                  item={item}
                  showButton={true}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5 ">
                <AddLocationAltIcon />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Thêm địa chỉ
                  </h1>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddressModal}
                  >
                    Thêm
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            //validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Phường"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="Tỉnh"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="Thành phố"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Phương thức thanh toán</InputLabel>
                    <Field
                      as={Select}
                      name="paymentMethod"
                      label="Phương thức thanh toán"
                      fullWidth
                    >
                      <MenuItem value="vnpay">
                        <img
                          src="vnPay.png"
                          alt="VNPay"
                          style={{
                            marginRight: "10px",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                        VNPay
                      </MenuItem>
                      <MenuItem value="stripe">
                        <img
                          src="stripe.png"
                          alt="Stripe"
                          style={{
                            marginRight: "10px",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                        Stripe
                      </MenuItem>
                      <MenuItem value="paypal">
                        <img
                          src="paypal.png"
                          alt="Paypal"
                          style={{
                            marginRight: "10px",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                        Paypal
                      </MenuItem>
                      <MenuItem value="onepay">
                        <img
                          src="onepay.png"
                          alt="OnePay"
                          style={{
                            marginRight: "10px",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                        OnePay
                      </MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Hoàn tất
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
