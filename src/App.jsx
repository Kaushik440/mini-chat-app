// src/App.jsx
import React, { useState } from "react";
import ChatRoom from "./ChatRoom.jsx";

function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if(username.trim() !== "") setLoggedIn(true);
  };

  return (
    <div className="container mt-5">
      {!loggedIn ? (
        <div className="text-center">
          <h2>Enter your username to join the chat</h2>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          />
          <button className="btn btn-primary" onClick={handleLogin}>Join Chat</button>
        </div>
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  );
}

export default App;
