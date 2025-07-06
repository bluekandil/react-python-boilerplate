import React from "react";
import "../index.css";

function DevFooter() {
  return (
    <footer className="footer stylish-footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} Dev DocX. All rights reserved.</span>
        <nav className="footer-nav">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
}

export default DevFooter;
