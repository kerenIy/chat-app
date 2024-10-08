const initialState = {
  messages: [],
  user: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "ADD_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
