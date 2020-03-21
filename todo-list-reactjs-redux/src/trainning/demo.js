import { createStore } from "redux";
import { status, sort } from "./actions/index";
import myReducer from './reducers/index'

const store = createStore(myReducer);
console.log("default: ", store.getState());

store.dispatch(status());
console.log("toggle status: ", store.getState());

store.dispatch(sort({
    by: "name",
    value: -1
}));
console.log("sortAction: ", store.getState());
