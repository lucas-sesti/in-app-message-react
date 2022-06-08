import { UserDTO } from "models/user/user.model";

export interface MessageDTO {
  sender: UserDTO;
  message: string;
  uuid: string;
}

export interface ConversationDTO {
  target: UserDTO;
  messages: MessageDTO[];
}
