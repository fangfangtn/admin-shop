// Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Tạo một file Header.css để đặt các kiểu CSS
import { CiViewList } from "react-icons/ci";
const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <div>
            <CiViewList className="text-white w-14 h-14" />
          </div>
          <h1 className="text-center font-bold text-[30px] my-auto  ">
            {" "}
            List Products{" "}
          </h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
