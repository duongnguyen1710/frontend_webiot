import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser} from "../State/Auth/Action";
import { Modal, Box, TextField, Button } from "@mui/material";
import { updateUserProfile } from "../State/User/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const ProfilePersonalInfo = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const jwt = localStorage.getItem("jwt");

  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setPreviewAvatar(user.avatar || "https://via.placeholder.com/150");
    }
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null); // Reset file chọn
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewAvatar(URL.createObjectURL(file)); // Hiển thị ảnh trước khi upload
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    dispatch(updateUserProfile(user.id, formData)); // Gửi formData thay vì JSON
    handleClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">Thông tin cá nhân</h2>

      {loading ? (
        <p>🔄 Đang tải...</p>
      ) : error ? (
        <p className="text-red-500">❌ {error}</p>
      ) : (
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <img
            src={user?.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border border-gray-300 shadow-sm"
          />

          {/* Thông tin người dùng */}
          <div>
            <p className="text-lg font-semibold">{user?.fullName || "Không có tên"}</p>
            <p className="text-gray-600">{user?.email || "Không có email"}</p>

            {/* Nút chỉnh sửa */}
            <button
              onClick={handleOpen}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
      )}

      {/* Popup chỉnh sửa */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2 className="text-lg font-bold mb-4">Chỉnh sửa thông tin</h2>

          {/* Hiển thị avatar preview */}
          <div className="text-center mb-4">
            <img src={previewAvatar} alt="Avatar Preview" className="w-24 h-24 rounded-full mx-auto" />
          </div>

          <TextField
            fullWidth
            label="Họ và Tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mb-3"
          />

          {/* Input chọn file */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-3"
          />

          <div className="flex justify-end gap-2">
            <Button onClick={handleClose} variant="contained" color="secondary">
              Hủy
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Lưu
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfilePersonalInfo;
