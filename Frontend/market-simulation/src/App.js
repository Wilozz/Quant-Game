import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserMenu from "./userMenu";
import ProfilePage from "./profilePage";
import SettingsPage from "./settingsPage";
import MainPage from "./MainPage"; 

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
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


