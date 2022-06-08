import { Avatar } from "Components/Avatar/Avatar";
import { ConversationDTO, MessageDTO, UserDTO } from "models";
import styles from "./PreviewMessage.module.scss";

interface Props extends ConversationDTO {
  receiver: UserDTO;
}

export default function Message({ target, receiver, messages }: Props) {
  let lastMessage: MessageDTO;

  if (messages && messages.length > 0) {
    lastMessage = messages[messages.length - 1];
  }

  return (
    <div className={styles["c-preview-message"]}>
      <div className={styles["c-preview-message__avatar"]}>
        <Avatar src={target.avatar} />
      </div>

      <div className={styles["c-preview-message__container"]}>
        <div className={styles["c-preview-message__container-content"]}>
          <h2 className={styles["c-preview-message__container-content-name"]}>
            {target.name}
          </h2>
        </div>

        <p className={styles["c-preview-message__container-message"]}>
          {lastMessage.sender.id === receiver.id ? "Você: " : ""}
          {lastMessage.message || "Começar uma conversa"}
        </p>
      </div>
    </div>
  );
}
