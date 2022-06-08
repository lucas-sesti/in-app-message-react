import { MessageDTO } from "models";
import { socket } from "./index";

export const socketEvents = ({ setValue }) => {
  socket.on("receiveMessage", (message: MessageDTO) => {
    setValue((state) => {
      return { ...state, message };
    });
  });
};
