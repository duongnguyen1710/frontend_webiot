import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyUser, resendOtp } from "../State/Auth/Action";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { success, error } = useSelector((state) => state.auth); // Lấy trạng thái từ Redux

  const validateOtp = (value) => {
    if (!/^\d{6}$/.test(value)) {
      return "Mã OTP phải gồm đúng 6 chữ số.";
    }
  };

  // Lấy email từ state hoặc để trống
  const email = location.state?.email || "";

  const initialValues = {
    email,
    otp: "",
  };

  // Trạng thái thời gian đếm ngược
  const [timeLeft, setTimeLeft] = useState(180); // 3 phút = 180 giây

  // Định dạng thời gian theo phút:giây
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleSubmit = (values) => {
    if (timeLeft > 0) {
      dispatch(verifyUser(values.email, values.otp));
    }
  };

  const handleResendOTP = () => {
    dispatch(resendOtp(email)); // Gửi lại OTP qua API
    setTimeLeft(180); // Reset thời gian
  };

  return (
    <div>
      {/* Icon quay lại */}
      <IconButton
        onClick={() => navigate("/register")}
        sx={{ position: "absolute", top: 10, left: 10 }}
      >
        <ArrowBack />
      </IconButton>

      <Typography variant="h5" className="text-center" sx={{ mt: 5 }}>
        Xác thực Email
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="otp"
              label="Mã OTP"
              fullWidth
              variant="outlined"
              margin="normal"
              validate={validateOtp} // Áp dụng validation
              error={touched.otp && Boolean(errors.otp)}
              helperText={
                touched.otp && errors.otp
                  ? errors.otp
                  : timeLeft > 0
                  ? `Thời gian còn lại: ${formatTime(timeLeft)}`
                  : "Thời gian nhập OTP đã hết. Hãy gửi lại OTP."
              }
              InputProps={{
                readOnly: timeLeft <= 0, // Vô hiệu hóa nhập khi hết thời gian
              }}
            />

            <Button
              sx={{ mt: 2, padding: "1rem" }}
              fullWidth
              type="submit"
              variant="contained"
              disabled={timeLeft <= 0} // Vô hiệu hóa nút khi hết thời gian
            >
              Xác thực
            </Button>
          </Form>
        )}
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Bạn chưa nhận được mã OTP?{" "}
        <Button onClick={handleResendOTP}>Gửi lại OTP</Button>
      </Typography>

      {/* Hiển thị thông báo thành công hoặc lỗi */}
      {success && (
        <Typography color="success.main" align="center" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
      {error && (
        <Typography color="error.main" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default VerifyEmail;
