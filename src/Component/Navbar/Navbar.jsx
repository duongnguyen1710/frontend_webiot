import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar, IconButton } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../State/Auth/Action";
import Cart from "../Cart/Cart";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/profile");
    } else {
      navigate("/admin/restaurants");
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Bạn có muốn đăng xuất?");
    if (confirmed) {
      dispatch(logout());
      navigate("/");
    }
  };


  return (
    <>
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          {/* Logo and centered search bar */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <h2
                onClick={() => navigate("/")}
                className="logo font-semibold text-gray-300 text-2xl cursor-pointer"
              >
                LINHKIENIOT
              </h2>
            </div>
            <div className="relative w-full max-w-md mx-auto">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative flex items-center">
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search..."
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Search</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Notification, cart, and profile dropdown */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Cart Icon */}
            <button
              type="button"
              
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-4"
            >
              <span className="sr-only">View cart</span>
              <ShoppingCartIcon onClick={()=>navigate("cart")}  className="h-6 w-6" />
            </button>

            {/* Profile dropdown menu */}
            <div className="ml-2 relative">
              {auth.user ? (
                <Menu as="div" className="relative">
                  <Menu.Button className="focus:outline-none">
                    <Avatar
                      sx={{
                        bgcolor: "transparent", // Màu nền trong suốt
                        color: "gray", // Màu xám giống text-gray-400
                        "&:hover": {
                          color: "#ffffff", // Chuyển sang màu trắng khi hover
                        },
                      }}
                    >
                      {auth.user?.fullName[0].toUpperCase()}
                    </Avatar>
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleAvatarClick}
                          className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : "text-gray-700"}`}
                        >
                          Thông tin cá nhân
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : "text-gray-700"}`}
                        >
                          Đăng xuất
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <IconButton onClick={() => navigate("/login")}>
                  <Person className="text-gray-400 hover:text-white" />
                </IconButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
    
    </>
  );
}
