const taskFilterReducer = (state = null, action) => {
  switch (action.type) {
    case "taskFilter":
      return action.payload;
    default:
      return state;
  }
};

export default taskFilterReducer;
