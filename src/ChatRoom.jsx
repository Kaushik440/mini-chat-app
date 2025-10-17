// src/ChatRoom.jsx
import React, { useState, useEffect, useRef } from "react";
import { database } from "./firebase.js";
import { ref, push, onValue } from "firebase/database";

function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const msgs = data ? Object.values(data) : [];
      setMessages(msgs);
      scrollToBottom();
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const messagesRef = ref(database, "messages");
    push(messagesRef, {
      username,
      text: newMessage,
      time: new Date().toLocaleTimeString()
    });
    setNewMessage("");
  };

  return (
    <div className="container mt-3">
      <h3>Mini Chat App</h3>
      <div className="border p-3 mb-3" style={{height: "300px", overflowY: "scroll"}}>
        {messages.map((msg, index) => (
          <div key={index}><b>{msg.username}</b>: {msg.text} <small>{msg.time}</small></div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button className="btn btn-primary" onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;
