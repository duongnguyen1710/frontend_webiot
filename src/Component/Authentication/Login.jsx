import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../State/Auth/Action"; // Giả định bạn đã có action loginUser

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser({ userData: values, navigate }));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!values.password) {
      errors.password = "Mật khẩu không được để trống";
    }
    return errors;
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Typography
        variant="h5"
        align="center"
        sx={{
          marginBottom: 2,
          marginTop: "2rem", // Thêm khoảng cách phía trên
        }}
      >
        Đăng nhập
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={validate}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              InputProps={{
                sx: {
                  "&::placeholder": {
                    textAlign: "center", // Căn giữa placeholder
                  },
                  textAlign: "center", // Căn giữa text
                },
              }}
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
              InputProps={{
                sx: {
                  "&::placeholder": {
                    textAlign: "center", // Căn giữa placeholder
                  },
                  textAlign: "center", // Căn giữa text
                },
              }}
            />
            <Button
              sx={{
                mt: 3,
                padding: "0.5rem",
                fontSize: "0.875rem",
                width: "100%",
              }}
              type="submit"
              variant="contained"
            >
              Đăng nhập
            </Button>
          </Form>
        )}
      </Formik>
      <Typography
        variant="body2"
        align="center"
        sx={{
          mt: 3,
          fontSize: "0.875rem",
        }}
      >
        Bạn chưa có tài khoản?{" "}
        <Button
          onClick={() => navigate("/register")}
          sx={{ fontSize: "0.875rem" }}
        >
          Đăng ký
        </Button>
      </Typography>
    </div>
  );
};

export default Login;
