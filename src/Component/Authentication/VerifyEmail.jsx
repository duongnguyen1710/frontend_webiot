import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyUser } from "../State/Auth/Action";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Lấy email từ state hoặc để trống
  const email = location.state?.email || "";

  const initialValues = {
    email,
    otp: "",
  };

  

  const handleSubmit = (values) => {
    dispatch(verifyUser(values.email, values.otp));
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Xác thực Email
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
    
      >
        {({ errors, touched }) => (
          <Form>
            {/* <Field 
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true, // Email chỉ đọc
              }}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            /> */}
            <Field
              as={TextField}
              name="otp"
              label="Mã OTP"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.otp && Boolean(errors.otp)}
              helperText={touched.otp && errors.otp}
            />

            <Button
              sx={{ mt: 2, padding: "1rem" }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Xác thực
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Bạn chưa nhận được mã OTP?{" "}
        <Button onClick={() => navigate("/register")}>Đăng ký lại</Button>
      </Typography>
    </div>
  );
};

export default VerifyEmail;
