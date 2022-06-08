import { UserDTO } from "models";
import { socket } from "./index";

export const sendMessage = (data: {
  message: string;
  user: UserDTO;
  uuid: string;
}) => {
  socket.emit("sendMessage", data);
};
