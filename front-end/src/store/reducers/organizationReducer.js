const organizationFilterReducer = (state = [], action) => {
  switch (action.type) {
    case "organizationFilter":
      return action.payload;
    default:
      return state;
  }
};

export default organizationFilterReducer;
