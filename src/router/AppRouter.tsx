// AppRouter.tsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../components/Login";
import ProductList from "../components/ProductList";
import AddEditProduct from "../components/AddEditProduct";
import PrivateRouter from "./PrivateRouter";
import Logout from "../components/Logout";
import Sidebar from "../components/Sidebar"; 

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10 main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin/products"
              element={
                <PrivateRouter>
                  <ProductList />
                </PrivateRouter>
              }
            />
            <Route
              path="/admin/products/addProduct"
              element={
                <PrivateRouter>
                  <AddEditProduct />
                </PrivateRouter>
              }
            />
            <Route
              path="/admin/products/editProduct/:id"
              element={
                <PrivateRouter>
                  <AddEditProduct />
                </PrivateRouter>
              }
            />
            <Route path="/admin/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
