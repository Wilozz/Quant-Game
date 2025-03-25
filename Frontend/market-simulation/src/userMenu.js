import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserMenu({ toggleDarkMode, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Profile Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "absolute",
          top: "10px",
          right: "10px"
        }}
      >
        W
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "10px",
            background: isDarkMode ? "#333" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
          }}
        >
          <Link to="/profile" style={{ display: "block", padding: "5px 10px", textDecoration: "none", color: "inherit" }}>
            User Profile
          </Link>
          <Link to="/settings" style={{ display: "block", padding: "5px 10px", textDecoration: "none", color: "inherit" }}>
            Settings
          </Link>
          <button
            onClick={toggleDarkMode}
            style={{ display: "block", padding: "5px 10px", border: "none", background: "none", cursor: "pointer", color: "inherit" }}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;