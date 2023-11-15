// components/Login.tsx

import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ useremail: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://103.107.183.103:3000/users/login', formData);
      console.log(response.data,"response")
      // const { accessToken, refreshToken } = response.data;

      // Lưu token vào cookies hoặc local storage nếu cần
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    }
  }

  return (
    <div className="max-w-xs mx-auto mt-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="useremail"
          value={formData.useremail}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
