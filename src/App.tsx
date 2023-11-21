import AddEditProduct from "./components/AddEditProduct";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
