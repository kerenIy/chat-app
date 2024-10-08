export const sendMessage = (message) => {
  return {
    type: "SEND_MESSAGE",
    payload: message,
  };
};

export const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};
