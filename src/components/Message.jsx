import { Avatar } from "@mui/material";
import React from "react";

export default function Message({ message, currentUser }) {
  return (
    <div>
      <div className="message">
        <div
          className={` ${
            message.user === currentUser
              ? "message-content-blue"
              : "message-content-gray"
          }`}
        >
          <div className="">
            <div
              className={`message-bubble ${
                message.user === currentUser
                  ? "message-bubble-blue"
                  : "message-bubble-gray"
              }`}
            >
              <p>{message.message}</p>
            </div>
            <div className="message">
              <span>{message.user}</span>
              <span className="message-timestamp">{message.timestamp}PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
