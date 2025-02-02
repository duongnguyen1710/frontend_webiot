import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Auth/Action";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
  } || {});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Họ tên không được để trống";
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.password || typeof formData.password !== "string") {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ?? "", // Tránh undefined
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(registerUser({ userData: formData, navigate }));
    } catch (error) {
      if (error.message?.includes("Email")) {
        setErrors({ email: error.message });
      } else {
        console.error("Unexpected error:", error.message);
        console.log("Duongdez");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        Đăng ký tài khoản
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="fullName"
          label="Họ tên"
          fullWidth
          variant="outlined"
          margin="normal"
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          name="password"
          label="Mật khẩu"
          fullWidth
          variant="outlined"
          margin="normal"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button
          sx={{ mt: 2, padding: "1rem" }}
          fullWidth
          type="submit"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Bạn đã có tài khoản?{" "}
        <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
      </Typography>
    </div>
  );
}
