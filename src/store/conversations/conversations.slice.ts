import { createSlice } from "@reduxjs/toolkit";

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState: {},
  reducers: {
    initConversation(state, { payload }) {
      const { target } = payload;

      if (!state.hasOwnProperty(target.id)) {
        return {
          ...state,
          [target.id]: {
            messages: [],
            target,
          },
        };
      }

      return state;
    },
    pushMessageConversation(state, { payload }) {
      const { targetId, message } = payload;

      const conversation = state[targetId];

      const newConversation = {
        messages: [...conversation.messages, message],
        target: conversation.target,
      };

      return { ...state, [targetId]: newConversation };
    },
  },
});

export const { pushMessageConversation, initConversation } =
  conversationsSlice.actions;

export const selectConversations = (state) => state.conversations;

export default conversationsSlice.reducer;
