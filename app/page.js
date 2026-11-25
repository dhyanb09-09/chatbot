"use client";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function send() {
    if (!input.trim()) return;
    const text = input;
    setMessages((m) => [...m, { role: "You", text }]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    setMessages((m) => [...m, { role: "Bot", text: data.reply }]);
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>ChatBot</h1>
      {messages.map((m, i) => (
        <p key={i}>
          <b>{m.role}:</b> {m.text}
        </p>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Type a message"
      />
      <button onClick={send}>Send</button>
    </div>
  );
}