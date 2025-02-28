import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
} from "../State/Address/Action";

const ProfileAddress = () => {
  const dispatch = useDispatch();
  const { addresses, loading, error, page, totalPages } = useSelector(
    (state) => state.address
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    fullAddress: "",
    street: "",
    city: "",
    province: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(getUserAddresses(token, currentPage));
    }
  }, [dispatch, currentPage]);

  const getPageNumbers = () => {
    const maxPagesToShow = 3;
    const pageNumbers = [];
    const startPage = Math.max(0, currentPage - 1);
    const endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenPopup = (editMode = false, address = null) => {
    setIsPopupOpen(true);
    setIsEditMode(editMode);
    if (editMode && address) {
      setCurrentEditId(address.id);
      setNewAddress({
        fullName: address.fullName,
        phone: address.phone,
        fullAddress: address.fullAddress,
        street: address.street,
        city: address.city,
        province: address.province,
      });
    } else {
      setNewAddress({
        fullName: "",
        phone: "",
        fullAddress: "",
        street: "",
        city: "",
        province: "",
      });
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsEditMode(false);
    setCurrentEditId(null);
    setNewAddress({
      fullName: "",
      phone: "",
      fullAddress: "",
      street: "",
      city: "",
      province: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleSaveAddress = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Bạn cần đăng nhập để thêm địa chỉ.");
      return;
    }

    try {
      if (isEditMode && currentEditId) {
        await dispatch(updateAddress(currentEditId, newAddress, token));
        alert("Cập nhật địa chỉ thành công.");
      } else {
        await dispatch(createAddress(newAddress, token));
        alert("Thêm địa chỉ thành công.");
      }

      handleClosePopup(); // Đóng popup sau khi lưu
      dispatch(getUserAddresses(token, currentPage)); // Load lại danh sách địa chỉ
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleDeleteAddress = async (id) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Bạn cần đăng nhập để xóa địa chỉ.");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      try {
        await dispatch(deleteAddress(id, token));
        alert("Địa chỉ đã được xóa thành công.");
      } catch (error) {
        console.error("Error deleting address:", error);
        alert("Xóa địa chỉ thất bại. Vui lòng thử lại.");
      }
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách địa chỉ của bạn</h1>

      <button
        onClick={() => handleOpenPopup(false)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Thêm Mới Địa Chỉ
      </button>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Họ và tên</th>
            <th className="py-2 px-4 border">Số điện thoại</th>
            <th className="py-2 px-4 border">Địa chỉ</th>
            <th className="py-2 px-4 border">Phường</th>
            <th className="py-2 px-4 border">Thành phố</th>
            <th className="py-2 px-4 border">Tỉnh</th>
            <th className="py-2 px-4 border">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {addresses?.map((address) => (
            <tr key={address.id}>
              <td className="py-2 px-4 border">{address.fullName}</td>
              <td className="py-2 px-4 border">{address.phone}</td>
              <td className="py-2 px-4 border">{address.fullAddress}</td>
              <td className="py-2 px-4 border">{address.street}</td>
              <td className="py-2 px-4 border">{address.city}</td>
              <td className="py-2 px-4 border">{address.province}</td>
              <td className="py-2 px-4 border flex justify-center gap-2">
                <button
                  onClick={() => handleOpenPopup(true, address)}
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Trang trước
        </button>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`px-4 py-2 mx-1 rounded-md ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
          }
          disabled={currentPage + 1 >= totalPages}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Trang sau
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-[600px] max-w-full">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Chỉnh Sửa Địa Chỉ" : "Thêm Mới Địa Chỉ"}
            </h2>
            {[
              "Họ tên",
              "Số điện thoại",
              "Địa chỉ",
              "Phường",
              "Thành phố",
              "Tỉnh",
            ].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={newAddress[field]}
                onChange={handleInputChange}
                className="block border p-2 w-full mb-2"
              />
            ))}
            <div className="flex justify-end gap-2">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveAddress}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                {isEditMode ? "Lưu Thay Đổi" : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAddress;
