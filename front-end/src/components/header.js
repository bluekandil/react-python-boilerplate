import React from "react";
import "../index.css";

function Header() {
  return (
    <div className="header stylish-header">
      <div className="logo"></div>
      <div className="title">Dev DocX</div>
      <nav className="nav-bar">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  );
}

export default Header;
