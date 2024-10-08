import React, { useState, useEffect } from "react";
import MessageTextBox from "./MessageTextBox";

import { useDispatchHook, useSelectorHook } from "../store/hooks";
import { addUser, sendMessage } from "../store/actions";

import MessageContainer from "./MessageContainer";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import ChatHeader from "./ChatHeader";

import { v4 as uuid } from "uuid";

export default function Chat() {
  const dispatch = useDispatchHook();
  const messages = useSelectorHook((state) => state.messages);
  const users = useSelectorHook((state) => state.user);

  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");

  const [count, setCount] = useState(0);

  const handleUserLogin = (name) => {
    dispatch(addUser(name));
    setLoggedIn(true);
  };

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    storedMessages.forEach((message) => {
      dispatch(sendMessage(message));
    });

    const channel = new BroadcastChannel("chat");
    channel.onmessage = (event) => {
      dispatch(sendMessage(event.data));
    };

    return () => {
      channel.close();
    };
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const clearChat = () => {
    localStorage.clear();
    window.location.reload();
  };

  const date = new Date();

  return (
    <div>
      {loggedIn ? (
        <div className="">
          <ChatHeader />
          <MessageContainer messages={messages} currentUser={name} />
          <MessageTextBox
            onSendMessage={(messages) => {
              const message = {
                id: uuid(),
                user: users,
                message: messages,
                timestamp: `${date.getHours()}:${date.getMinutes()}`,
              };
              //   dispatch(sendMessage(message));

              setCount(count + 1);

              const channel = new BroadcastChannel("chat");
              channel.postMessage(message);
            }}
          />
        </div>
      ) : (
        <>
          <p>Enter your chat username</p>
          <TextField
            label="Username"
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={() => handleUserLogin(name)}>Login</Button>
          <p onClick={clearChat}>Clear</p>
        </>
      )}
    </div>
  );
}
