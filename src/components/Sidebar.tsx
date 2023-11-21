// Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import '../styles/Sidebar.css'
const Sidebar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white w-1/7 sidebar">
      <ul className="p-4">
        <li className="mb-2">
          <Link to="/admin/products">Products</Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/products/addProduct">Add Product</Link>
        </li>
        {/* Thêm các mục sidebar khác khi cần */}
        <li className="mb-2">
          <Link to="/admin/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
