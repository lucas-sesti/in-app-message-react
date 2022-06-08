import classNames from "classnames";
import { Avatar } from "Components/Avatar/Avatar";
import { MessageDTO, UserDTO } from "models";
import styles from "./Message.module.scss";

interface Props extends MessageDTO {
  receiver: UserDTO;
  lastMessage: MessageDTO;
  nextMessage: MessageDTO;
}

export default function Message(props: Props) {
  const { message, receiver, sender, nextMessage } = props;

  const isSameUser = sender.id === receiver.id;

  const messageClassnames = classNames(
    styles["c-message"],
    styles[`c-message--${isSameUser ? "outgoing" : "incoming"}`]
  );

  let showAvatar: boolean;
  let nextMessageIsFromSameSender;

  if (nextMessage) {
    nextMessageIsFromSameSender = nextMessage.sender.id === sender.id;
  }

  showAvatar = sender.id !== receiver.id && !nextMessageIsFromSameSender;

  const textClassnames = classNames(styles["c-message__text"], {
    [styles["c-message__text--margin"]]: !showAvatar,
  });

  return (
    <div className={messageClassnames}>
      {showAvatar && (
        <div className={styles["c-message__image"]}>
          <Avatar src={sender.avatar} />
        </div>
      )}

      <div className={textClassnames}>
        <p className={styles["c-message__text-content"]}>{message}</p>
      </div>
    </div>
  );
}
