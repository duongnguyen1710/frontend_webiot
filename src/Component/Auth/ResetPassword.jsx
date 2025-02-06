import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../State/Auth/Action";
import { useNavigate } from "react-router-dom";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const { isPasswordReset, error } = useSelector((state) => state.auth); // Lấy trạng thái từ Redux
  const email = localStorage.getItem("resetEmail"); // Lấy email từ localStorage sau khi xác thực OTP

  const handleSubmit = async (values, { setSubmitting }) => {
    setMessage(""); // Xóa thông báo cũ

    if (values.newPassword !== values.confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp!");
      setSubmitting(false);
      return;
    }

    try {
      await dispatch(resetPassword({ email, newPassword: values.newPassword }));
      setMessage("Mật khẩu đã được đặt lại thành công!");
      setTimeout(() => {
        navigate("/login"); // Chuyển về trang đăng nhập sau khi đặt lại mật khẩu thành công
      }, 2000);
    } catch (error) {
      setMessage("Có lỗi xảy ra! Vui lòng thử lại.");
    }

    setSubmitting(false);
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Đặt lại mật khẩu
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="newPassword"
              label="Mật khẩu mới"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Field
              as={TextField}
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <Button
              sx={{ mt: 2, padding: "1rem" }}
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              Đặt lại mật khẩu
            </Button>
          </Form>
        )}
      </Formik>

      {message && (
        <Typography variant="body2" align="center" sx={{ mt: 2, color: "green" }}>
          {message}
        </Typography>
      )}

      {error && (
        <Typography variant="body2" align="center" sx={{ mt: 2, color: "red" }}>
          {error}
        </Typography>
      )}
    </div>
  );
}
