import React, { useState, useEffect, useRef } from "react";
import { database } from "./firebase.js";
import { ref, push, onValue, remove } from "firebase/database";

function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = ref(database, "messages");
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const msgs = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setMessages(msgs);
    });

    return () => {
      // cleanup realtime listener
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const messagesRef = ref(database, "messages");
    push(messagesRef, {
      username,
      text: newMessage,
      time: new Date().toLocaleTimeString(),
    });
    setNewMessage("");
  };

  const clearChat = () => {
    const messagesRef = ref(database, "messages");
    remove(messagesRef)
      .then(() => setMessages([]))
      .catch(() => {});
  };

  return (
    <div className="container mt-3">
      <h3 className="text-center mb-3">Chat Room😊</h3>

      <div className="border p-3 mb-3" style={{ height: "400px", overflowY: "scroll" }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded ${
              msg.username === username ? "bg-primary text-white ms-auto" : "bg-light text-dark"
            }`}
            style={{
              maxWidth: "70%",
              marginLeft: msg.username === username ? "auto" : "0",
            }}
          >
            <strong>{msg.username}</strong>: {msg.text}
            <div className="text-end" style={{ fontSize: "0.7rem" }}>{msg.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary me-2" onClick={sendMessage}>Send</button>
        <button className="btn btn-danger" onClick={clearChat}>Clear Chat</button>
      </div>
    </div>
  );
}

export default ChatRoom;
