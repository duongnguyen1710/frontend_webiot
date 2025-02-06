import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import VerifyEmail from "./VerifyEmail";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

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

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleOnClose = () => {
    navigate("/");
  };

  return (
    <>
      <Modal
        onClose={handleOnClose}
        open={
          location.pathname === "/register" ||
          location.pathname === "/login" ||
          location.pathname === "/verify-email" ||
          location.pathname === "/forgotpassword" ||
          location.pathname === "/resetpassword" // Thêm đường dẫn Reset Password
        }
      >
        <Box sx={style}>
          {location.pathname === "/register" ? (
            <Register />
          ) : location.pathname === "/login" ? (
            <Login />
          ) : location.pathname === "/verify-email" ? (
            <VerifyEmail />
          ) : location.pathname === "/forgotpassword" ? (
            <ForgotPassword />
          ) : (
            <ResetPassword />
          )}
        </Box>
      </Modal>
    </>
  );
};
