import { Action, configureStore } from "@reduxjs/toolkit";
import { Reducer } from "react";
import userReducer from "./user/user.slice";
import conversationsReducer from "./conversations/conversations.slice";

export interface Store {
  user: Reducer<any, Action>;
  conversations: Reducer<any, Action>;
}

export default configureStore({
  reducer: {
    user: userReducer,
    conversations: conversationsReducer,
  },
});
