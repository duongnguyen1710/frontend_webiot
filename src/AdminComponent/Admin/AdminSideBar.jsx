import { Dashboard, ShoppingBag } from "@mui/icons-material";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Component/State/Auth/Action";

const menu = [
  { title: "Thương hiệu", icon: <ShoppingBag />, path: "/brand" },
  { title: "Danh mục", icon: <ShoppingBag />, path: "/category" },
  { title: "Sản phẩm", icon: <ShoppingBag />, path: "/product" },
  { title: "Tin tức", icon: <ShoppingBag />, path: "/news" },
  { title: "Đơn hàng", icon: <ShoppingBag />, path: "/orders" },
];

const AdminSideBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Đăng xuất") {
      if (window.confirm("Bạn có muốn đăng xuất?")) {
        dispatch(logout());
        navigate("/");
        handleClose();
      }
    } else {
      navigate(`/admin${item.path}`);
      handleClose();
    }
  };

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={true}
        anchor="left"
        sx={{
          zIndex: 1,
          backgroundColor: "#1976d2", // Màu nền xanh dương
          color: "#fff", // Màu chữ trắng
          ".MuiDrawer-paper": {
            width: "240px",
            backgroundColor: "#1976d2",
            color: "#fff",
          },
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center py-5 border-b border-gray-100 text-xl font-semibold">
          Admin Panel
        </div>

        {/* Dashboard Section */}
        <div
          onClick={() => handleNavigate({ title: "Dashboard", path: "/" })}
          className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-[#1565c0]"
        >
          <Dashboard />
          <span>Dashboard</span>
        </div>

        <Divider sx={{ borderColor: "#ffffff33", margin: "10px 0" }} />

        {/* Menu Items */}
        <div className="flex flex-col">
          {menu.map((item, i) => (
            <div
              key={i}
              onClick={() => handleNavigate(item)}
              className="px-5 py-3 flex items-center gap-4 cursor-pointer hover:bg-[#1565c0] rounded-md"
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default AdminSideBar;
