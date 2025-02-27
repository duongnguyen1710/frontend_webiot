import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../State/Auth/Action";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast

// Giá trị khởi tạo của form
const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hàm validate thủ công
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Vui lòng nhập email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!values.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser({ userData: values, navigate }));
      // Không hiển thị toast khi đăng nhập thành công
    } catch (error) {
      toast.error("Email hoặc mật khẩu không chính xác!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Đặt ToastContainer ở đây để hiển thị thông báo */}
      <Typography variant="h5" className="text-center">
        Đăng nhập tài khoản
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues} validate={validate}>
        {({ errors, touched, isSubmitting }) => (
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
            />
            <Field
              as={TextField}
              name="password"
              label="Mật khẩu"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button
              sx={{ mt: 2, padding: "1rem" }}
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              Đăng nhập
            </Button>
          </Form>
        )}
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Bạn chưa có tài khoản?
        <Button size="small" onClick={() => navigate("/register")}>
          Đăng ký
        </Button>
      </Typography>

      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
        <Button size="small" onClick={() => navigate("/forgotpassword")}>
          Quên mật khẩu?
        </Button>
      </Typography>
    </div>
  );
}
