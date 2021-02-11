const initialState = { message: "" };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...state, message: action.data.message };
    case "REMOVE_NOTIFICATION":
        console.log(state)
      return { ...state, message: '' };
    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
      });
    }, time * 1000);
  };
};

// export const setNotification = (message) => {
//   return {
//     type: "SET_NOTIFICATION",
//     data: {
//       message,
//     },
//   };
// };

// export const removeNotification = () => {
//   return {
//     type: "REMOVE_NOTIFICATION",
//   };
// };

export default reducer;
