import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../components/Login";
import ProductList from "../components/ProductList";
import AddEditProduct from "../components/AddEditProduct";
import PrivateRouter from "./PrivateRouter";
import Logout from "../components/Logout";
const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/products"
            element={
              <PrivateRouter>
                <ProductList />
              </PrivateRouter>
            }
          />
          <Route
            path="/addProduct"
            element={
              <PrivateRouter>
                <AddEditProduct />
              </PrivateRouter>
            }
          />
          <Route
            path="/editProduct/:id"
            element={
              <PrivateRouter>
                <AddEditProduct />
              </PrivateRouter>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
