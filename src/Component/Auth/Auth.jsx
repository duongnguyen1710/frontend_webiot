import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import VerifyEmail from "./VerifyEmail";

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
          location.pathname === "/verify-email"
        }
      >
        <Box sx={style}>
          {location.pathname === "/register" ? (
            <Register />
          ) : location.pathname === "/login" ? (
            <Login />
          ) : (
            <VerifyEmail />
          )}
        </Box>
      </Modal>
    </>
  );
};