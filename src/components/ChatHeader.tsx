import { Menu } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";

export default function ChatHeader() {
  return (
    <div className="chat-header-container">
      <div className="chat-header">
        <div className="">
          <Avatar />
          <h1>ChatRoom</h1>
        </div>

        <IconButton>
          <Menu />
        </IconButton>
      </div>
    </div>
  );
}
