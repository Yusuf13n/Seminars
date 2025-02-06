import React from "react";
import "./ui.scss";

export const Header = () => {
  return (
    // Здесь Header)
    <header className="header">
      <h1 className="logo">Dream Job</h1>
      <nav className="nav">
        <ul>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};
