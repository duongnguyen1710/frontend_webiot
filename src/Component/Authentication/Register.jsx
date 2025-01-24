import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER", // Gán giá trị mặc định
};

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerUser({ userData: values, navigate }));
    setSubmitting(false); // Ngừng trạng thái gửi sau khi dispatch
  };

  const validate = (values) => {
    const errors = {};
    if (!values.fullName) {
      errors.fullName = "Họ tên không được để trống";
    }
    if (!values.email) {
      errors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!values.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (values.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return errors;
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        Đăng ký tài khoản
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={validate}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="fullName"
              label="Họ tên"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              name="password"
              label="Mật khẩu"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Field type="hidden" name="role" value="ROLE_CUSTOMER" />

            <Button
              sx={{ mt: 2, padding: "1rem" }}
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Bạn đã có tài khoản?{" "}
        <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
      </Typography>
    </div>
  );
}
