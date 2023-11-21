// components/Login.tsx

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = (chirdren: any) => {
  const [formData, setFormData] = useState({ useremail: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://103.107.183.103:3000/users/login",
        formData
      );
      console.log(response.data, "response");
      // const { accessToken, refreshToken } = response.data;

      // Lưu token vào cookies hoặc local storage nếu cần
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
      localStorage.setItem("isLoggedIn", "true");
      toast("Đăng nhập thành công");
      navigate("/products");
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      toast("Đăng nhập thất bại !!!");
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className=" mt-20 border-2 border-solid rounded-lg text-white bg-[#000033] mx-auto w-96 border-[#081229] p-6">
        <div className="w-80  ">
          <h2 className="text-2xl text-center items-center font-bold mb-4">
            Đăng nhập
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block ">Tài khoản:</label>
              <input
                type="text"
                name="useremail"
                value={formData.useremail}
                onChange={handleChange}
                placeholder="email"
                className="border-2 border-red-600 rounded-md px-3 py-2 w-72 text-black h-8"
              />
            </div>
            <div className="mb-4">
              <label className="block">Mật khẩu:</label>
              <div className="flex items-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="mật khẩu"
                  className="border-2 border-red-600 rounded-md px-3 py-2 text-black w-72 h-8"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-12 text-black focus:outline-none"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white  px-4 py-2 rounded-md hover:bg-blue-800"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
