import React, { useState, useEffect, useRef } from "react";
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
import { Avatar, Badge, IconButton } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../State/Auth/Action";
import { searchProducts } from "../State/Product/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { auth, cart, product } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null); // Thêm ref cho ô tìm kiếm

  // Xử lý tìm kiếm
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      dispatch(searchProducts(searchTerm));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm, dispatch]);

  // Ẩn danh sách khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Điều hướng hồ sơ
  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/profile");
    } else {
      navigate("/admin/restaurants");
    }
  };

  // Đăng xuất
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
            {/* Menu Mobile */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                <Bars3Icon className="block h-6 w-6" />
                <XMarkIcon className="hidden h-6 w-6" />
              </DisclosureButton>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <h2
                onClick={() => navigate("/")}
                className="font-semibold text-gray-300 text-2xl cursor-pointer"
              >
                LINHKIENIOT
              </h2>
            </div>

            {/* Thanh Tìm Kiếm */}
            <div className="flex-1 flex justify-center">
              <div ref={searchRef} className="relative w-full max-w-md">
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                />
                {/* Kết quả tìm kiếm */}
                {showResults && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {product.loading ? (
                      <div className="p-4 text-gray-500">Loading...</div>
                    ) : product.error ? (
                      <div className="p-4 text-red-500">
                        Error: {product.error}
                      </div>
                    ) : product.products.length > 0 ? (
                      product.products.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => navigate(`/detail/${product.id}`)}
                          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          <img
                            src={
                              product.images[0] ||
                              "https://via.placeholder.com/50"
                            }
                            alt={product.name}
                            className="h-12 w-12 object-cover rounded-md mr-4"
                          />
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Giỏ hàng và Hồ sơ */}
            <div className="flex items-center space-x-4">
              {/* Thông báo */}
              <button className="relative p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white">
                <BellIcon className="h-6 w-6" />
              </button>

              {/* Giỏ hàng */}
              <button
                className="relative p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white"
                onClick={() => navigate("/cart")}
              >
                <Badge badgeContent={cart.cartItems.length} color="error">
                  <ShoppingCartIcon className="h-6 w-6" />
                </Badge>
              </button>

              {/* Hồ sơ */}
              {/* Hồ sơ */}
              <div className="relative">
                {auth.user ? (
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="flex items-center text-sm focus:outline-none">
                        <Avatar src={auth.user.avatar || ""}>
                          {!auth.user.avatar &&
                            auth.user?.fullName[0]?.toUpperCase()}
                        </Avatar>
                      </Menu.Button>
                    </div>

                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50">
                      <div className="px-4 py-2">
                        <p className="text-sm text-gray-500">
                          Xin chào, {auth.user?.fullName}
                        </p>
                      </div>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleAvatarClick}
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } group flex items-center px-4 py-2 text-sm w-full`}
                          >
                            Thông tin cá nhân
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } group flex items-center px-4 py-2 text-sm w-full`}
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
