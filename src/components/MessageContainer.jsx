import React from "react";
import Message from "./Message";

export default function MessageContainer({ messages, currentUser }) {
  console.log(messages);
  return (
    <div>
      <div className="message-container">
        {messages.map((message, index) => (
          <Message message={message} key={index} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
}
