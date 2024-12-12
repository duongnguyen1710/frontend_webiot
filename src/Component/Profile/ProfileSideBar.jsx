import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { AddReaction } from "@mui/icons-material";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../State/Auth/Action";
import { useNavigate } from "react-router-dom";


const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <AddReaction /> },
  { title: "Payments", icon: <AccountBalanceWalletIcon /> },
  { title: "Notification", icon: <NotificationsActiveIcon /> },
  { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

const titlesMap = {
  Orders: "Thông tin cá nhân",
  Favorites: "Yêu thích",
  Address: "Địa chỉ",
  Payments: "Thanh toán",
  Notification: "Thông báo",
  Events: "Sự kiện",
  Logout: "Đăng xuất"
};

export const ProfileSideBar = ({ open, handleClose }) => {
  const isSamllSreen = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const handleLogout = () => {
    const confirmed = window.confirm("Bạn có muốn đăng xuất?");
    if (confirmed) {
      dispatch(logout());
      navigate("/");
    }
  };
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleNavigate = (item) => {
//     if (item.title === "Logout") {
//       dispatch(logout());
//       navigate("/");
//     } else {
//       navigate(`/my-Proflie/${item.title.toLowerCase()}`);
//     }
//   };

  return (
    <div>
      <Drawer
        variant={isSamllSreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={open}
        anchor="left"
        sx={{ zIndex: -1, position: "sticky" }}
      >
        <div className="w-[50vw] lg:w-[20vw] h-[90vh] flex flex-col justify-center text-xl gap-8 pt-16">
          {menu.map((item, i) => (
            <React.Fragment key={i}>
              <div
                
                className="px-5 flex items-center space-x-5 cursor-pointer"
              >
                {item.icon}
                <span>{titlesMap[item.title]}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
