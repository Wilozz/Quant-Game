import React from 'react';

function App() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the Trading Platform</h1>
      <p>Buy and sell assets in real-time!</p>
      <button onClick={() => alert('Trading feature coming soon!')}>
        Trade Now
      </button>
    </div>
  );
}

export default App;
