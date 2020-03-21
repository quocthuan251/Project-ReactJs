var initialState = {
  by: "yolo",
  value: 2
};

var myReducer = (state = initialState, action) => {
  if (action.type === "SORT") {
    var { by, value } = action.sort;

    return {
      by,
      value
    };
  }
  return state;
};
export default myReducer;
