import {
    Button,
    TextField,
    Typography,
  } from "@mui/material";
  import { Field, Form, Formik } from "formik";
  import React from "react";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Auth/Action";
  
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER", // Gán giá trị mặc định
  };
  
  export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = values => {
      console.log("form values", values);
      dispatch(registerUser({userData:values,navigate}))
    };
    return (
      <div>
        <Typography variant="h5" className="text-center">
          Đăng ký tài khoản
        </Typography>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          <Form>
            <Field
              as={TextField}
              name="fullName"
              label="Họ tên"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Field
              as={TextField}
              name="password"
              label="Mật khẩu"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
            />
  
            {/* Trường ẩn cho quyền truy cập */}
            <Field type="hidden" name="role" value="ROLE_CUSTOMER" />
  
            <Button
              sx={{ mt: 2, padding: "1rem" }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Đăng ký
            </Button>
          </Form>
        </Formik>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Bạn đã có tài khoản?
          <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
        </Typography>
      </div>
    );
  }
  