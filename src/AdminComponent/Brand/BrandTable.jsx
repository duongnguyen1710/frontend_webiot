import {
    Box,
    Card,
    CardHeader,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import CreateIcon from "@mui/icons-material/Create";
  
  import { useDispatch, useSelector } from "react-redux";
  import { getListBrand } from "../../Component/State/Brand/Action";
  import CreateBrand from "./CreateBrand";
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  export default function BrandTable() {
    const { brand, loading, error } = useSelector((store) => store.brand);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    useEffect(() => {
      dispatch(getListBrand(jwt)); 
    }, [dispatch, jwt]);
  
    return (
      <div>
        <Box>
          <Card className="mt-1">
            <CardHeader
              action={
                <IconButton onClick={handleOpen} aria-label="settings">
                  <CreateIcon />
                </IconButton>
              }
              title={"Danh sách Thương hiệu"}
              sx={{ pt: 2, alignItems: "center" }}
            />
  
            {/* Bảng Thương Hiệu */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Mã thương hiệu</TableCell>
                    <TableCell align="left">Tên thương hiệu</TableCell>
                    <TableCell align="left">Mô tả</TableCell>
                    <TableCell align="left">Ngày tạo</TableCell>
                    <TableCell align="left">Ngày cập nhật</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Hiển thị thông báo loading */}
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        Đang tải dữ liệu...
                      </TableCell>
                    </TableRow>
                  )}
                  {/* Hiển thị thông báo lỗi */}
                  {error && (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        Lỗi: {error}
                      </TableCell>
                    </TableRow>
                  )}
                  {/* Hiển thị dữ liệu */}
                  {brand.length > 0 &&
                    brand.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {item.id}
                        </TableCell>
                        <TableCell align="left">{item.name}</TableCell>
                        <TableCell align="left">{item.description}</TableCell>
                        <TableCell align="left">{item.createAt}</TableCell>
                        <TableCell align="left">{item.updateAt}</TableCell>
                      </TableRow>
                    ))}
  
                  {/* Hiển thị nếu không có thương hiệu */}
                  {brand.length === 0 && !loading && !error && (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        Không có dữ liệu thương hiệu.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
  
          {/* Modal Tạo Thương Hiệu */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CreateBrand />
            </Box>
          </Modal>
        </Box>
      </div>
    );
  }
  