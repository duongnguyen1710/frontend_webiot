import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footers/Footers";
import Home from "../Component/Home/Home";
import { Auth } from "../Component/Auth/Auth";
import Profile from "../Component/Profile/Profile";
import ProductDetail from "../Component/Product/ProductDetail";
import ProductByCategory from "../Component/Product/ProductByCategory";
import Order from "../Component/Order/Order";
import ListBlog from "../Component/Blog/ListBlog";
import Category from "../Component/Category/Category";
import NewProduct from "../Component/Home/NewProduct";


const Customer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      <main className="flex-1 mt-[64px] mb-[64px]"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:register" element={<Home />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path='/detail/:id' element={<ProductDetail />} />
          <Route path="/product" element={<ProductByCategory />} />
          <Route path="/order" element={<Order />} />
          <Route path="/blog" element={<ListBlog />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>

      <Auth />
    </div>
  );
};

export default Customer;