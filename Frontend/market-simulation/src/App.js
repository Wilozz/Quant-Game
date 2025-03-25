import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserMenu from "./userMenu";
import ProfilePage from "./profilePage";
import SettingsPage from "./settingsPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);  

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <div style={{ background: isDarkMode ? "#121212" : "#fff", minHeight: "100vh", color: isDarkMode ? "#fff" : "#000" }}>
        <UserMenu toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<h1>Welcome to the Trading Platform</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


{/* <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the Trading Platform</h1>
      <p>Buy and sell assets in real-time!</p>
      <button onClick={() => alert('Trading feature coming soon!')}>
        Trade Now
      </button>
    </div> */}