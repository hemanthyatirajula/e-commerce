import React from "react";
import "./Admin.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import Orders from "../../Components/Orders/Orders";

const Admin = () => {
  return (
    <div className="admin-shell">
      <Sidebar />
      <main className="admin-main">
        <div className="admin-content">
          <Routes>
            <Route path="/" element={<Navigate to="/addproduct" replace />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<Navigate to="/addproduct" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Admin;



