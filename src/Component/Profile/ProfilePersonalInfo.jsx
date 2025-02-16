import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../State/Auth/Action";
import { Modal, Box, TextField, Button } from "@mui/material";
import { updateUserProfile } from "../State/User/Action";
import { changePassword } from "../State/User/Action"; // Import action đổi mật khẩu

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
  const { success, error: passwordError, message } = useSelector((state) => state.profile);
  const jwt = localStorage.getItem("jwt");

  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (success && user) {
        setFullName(user.fullName || "");
        setPreviewAvatar(user.avatar || "https://via.placeholder.com/150"); // ✅ Cập nhật avatar ngay lập tức
    }
}, [success, user]); // ✅ Khi thành công, tự động cập nhật avatar mới


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setShowChangePassword(false); // Đóng form đổi mật khẩu
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("request", JSON.stringify({ fullName }));

    if (selectedFile) {
        formData.append("avatar", selectedFile);
    }

    dispatch(updateUserProfile(user.id, formData)).then(() => {
        // ✅ Cập nhật avatar ngay khi Redux hoàn thành
        if (selectedFile) {
            setPreviewAvatar(URL.createObjectURL(selectedFile)); 
        }
        handleClose(); // ✅ Đóng modal ngay lập tức
    });
};



  const handleChangePassword = () => {
    dispatch(changePassword(currentPassword, newPassword));
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
          <img
            src={user?.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border border-gray-300 shadow-sm"
          />
          <div>
            <p className="text-lg font-semibold">{user?.fullName || "Không có tên"}</p>
            <p className="text-gray-600">{user?.email || "Không có email"}</p>
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

          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-3" />

          {/* Nút đổi mật khẩu */}
          {!showChangePassword && (
            <Button
              onClick={() => setShowChangePassword(true)}
              variant="outlined"
              color="primary"
              fullWidth
              className="mb-3"
            >
              Đổi mật khẩu
            </Button>
          )}

          {/* Form đổi mật khẩu */}
          {showChangePassword && (
            <>
              <TextField
                fullWidth
                label="Mật khẩu hiện tại"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mb-3"
              />
              <TextField
                fullWidth
                label="Mật khẩu mới"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mb-3"
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              {success && <p className="text-green-500">{message}</p>}
              <Button onClick={handleChangePassword} variant="contained" color="primary" fullWidth>
                Xác nhận đổi mật khẩu
              </Button>
            </>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleClose} variant="contained" color="secondary">
              Hủy
            </Button>
            {!showChangePassword && (
              <Button onClick={handleSave} variant="contained" color="primary">
                Lưu
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfilePersonalInfo;
