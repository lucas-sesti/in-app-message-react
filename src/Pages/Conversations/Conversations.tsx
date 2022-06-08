import { ConversationDTO, UserDTO } from "models";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "store/user/user.slice";
import styles from "./Conversations.module.scss";
import Message from "./PreviewMessage/PreviewMessage";

import FriendsSuggestions from "./Friends/Suggestions/FriendsSuggestions";
import { selectConversations } from "store/conversations/conversations.slice";

export default function Conversations() {
  // States
  const conversations: Record<string, ConversationDTO> =
    useSelector(selectConversations);

  const user: UserDTO = useSelector(selectUser);

  return (
    <div className={styles["c-conversations"]}>
      <div className={styles["c-conversations__header"]}>
        <h1 className={styles["c-conversations__header-title"]}>
          Chat with your friends
        </h1>
        <div className={styles["c-conversations__header-friends"]}>
          <FriendsSuggestions />
        </div>

        <div className={styles["c-conversations__header--divider"]}></div>
      </div>

      <div className={styles["c-conversations__container"]}>
        {Object.values(conversations).map(({ target, messages }) => {
          return (
            <Link to={`/conversations/${target.id}`} key={target.id}>
              <Message messages={messages} target={target} receiver={user} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
