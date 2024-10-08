import { useState } from "react";
import { Provider } from "react-redux";

import store from "./store/store";
import "./App.css";

import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Provider store={store}>
        <Chat />
      </Provider>
    </>
  );
}

export default App;
