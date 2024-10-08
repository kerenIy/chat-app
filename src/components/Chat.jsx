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
          <br />
          <br />
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
          <div className="login-button-container">
            <div className="">
              <p className="username">Enter your chat username</p>
              <input
                type="text"
                placeholder="Username"
                className="login-input"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <br />
              <div className="login-button-container">
                <button
                  className="login-button"
                  onClick={() => handleUserLogin(name)}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
