import React from "react";
import { faEdit, faEllipsisH, faVideo } from "@fortawesome/free-solid-svg-icons";
import "./Chatheads.css";

export default function ChatHeads({ items, setReceiver }) {
  return (
    <div>
      <div className="conv-header-container">
        <p className="conversations-header">Conversations</p>
        <div>
          <faEllipsisH />
          <faVideo />
          <faEdit />
        </div>
      </div>
      <input className="chat-heads-search" placeholder="Search in Messenger" />
      <div className="chat-heads-container">
        {items.map((obj, i) => (
          <div
            key={i}
            className="chat-head-item"
            onClick={() => setReceiver(obj)}
          >
            <div className="user-profile-pic-container">
              <p className="user-profile-pic-text">{obj.email[0]}</p>
            </div>
            <p>{obj.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}