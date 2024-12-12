import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import Dashboard from "../Dashboard/Dashboard";
import ListBrand from "../Brand/ListBrand";

const AdminMain = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  const handleClose = () => {};
  
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSideBar handleClose={handleClose} />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/brand" element={<ListBrand/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
