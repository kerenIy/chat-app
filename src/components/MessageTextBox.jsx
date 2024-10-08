import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

import { IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicIcon from "@mui/icons-material/Mic";

import { SendAndArchiveSharp } from "@mui/icons-material";

export default function MessageTextBox({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="message-input">
      <input
        type="text"
        placeholder="Type message ..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <div className="">
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <IconButton>
          <GifIcon />
        </IconButton>
        <IconButton>
          <EmojiEmotionsIcon />
        </IconButton>
        <IconButton>
          <MicIcon />
        </IconButton>
        <IconButton type="submit">
          <SendAndArchiveSharp />
        </IconButton>
      </div>
    </form>
  );
}
