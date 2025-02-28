import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { sendOtpForgotPassword, verifyOtpForgotPassword } from "../State/Auth/Action";

const initialValues = {
  email: "",
  otp: "",
};

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook để điều hướng trang
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // Step 1: Nhập email, Step 2: Nhập OTP

  const handleSubmit = async (values, { setSubmitting }) => {
    setMessage(""); // Xóa thông báo cũ
  
    if (step === 1) {
      // Gửi OTP
      try {
        await dispatch(sendOtpForgotPassword(values.email));
        setMessage("OTP đã được gửi đến email của bạn!");
        setStep(2); // Chuyển sang bước nhập OTP
      } catch (error) {
        setMessage("Có lỗi xảy ra! Vui lòng thử lại.");
      }
    } else if (step === 2) {
      // Xác thực OTP
      try {
        await dispatch(verifyOtpForgotPassword({ email: values.email, otp: values.otp }));
        setMessage("OTP hợp lệ! Bạn có thể đặt lại mật khẩu.");
  
        // Lưu email vào localStorage để ResetPassword.js có thể lấy lại
        localStorage.setItem("resetEmail", values.email);
  
        // Chuyển hướng sang trang Reset Password sau khi OTP hợp lệ
        setTimeout(() => {
          navigate("/resetpassword");
        }, 1000); // Chuyển trang sau 1 giây
      } catch (error) {
        setMessage("OTP không hợp lệ! Vui lòng thử lại.");
        setSubmitting(false);
        return; // **Thêm return để dừng lại khi OTP sai**
      }
    }
  
    setSubmitting(false);
  };
  

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Quên mật khẩu
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ isSubmitting }) => (
          <Form>
            {/* Input nhập Email */}
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              disabled={step === 2} // Khi đã gửi OTP, không cho sửa email
            />

            {/* Hiển thị ô nhập OTP nếu đã gửi OTP */}
            {step === 2 && (
              <Field
                as={TextField}
                name="otp"
                label="Nhập OTP"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            )}

            <Button
              sx={{ mt: 2, padding: "1rem" }}
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {step === 1 ? "Gửi OTP" : "Xác thực OTP"}
            </Button>
          </Form>
        )}
      </Formik>

      {message && (
        <Typography variant="body2" align="center" sx={{ mt: 2, color: "green" }}>
          {message}
        </Typography>
      )}
    </div>
  );
}
