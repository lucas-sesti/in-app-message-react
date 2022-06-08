import SocketContext from "Components/Socket/Context";

import { ConversationDTO, MessageDTO, UserDTO } from "models";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { CgPhone } from "react-icons/cg";
import { MdSend, MdVideoCall } from "react-icons/md";
import { sendMessage } from "socket/emit";
import styles from "./Conversation.module.scss";
import Message from "./Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/user/user.slice";
import { userService } from "services/user/user.service";
import { useNavigate, useParams } from "react-router-dom";
import {
  initConversation,
  pushMessageConversation,
  selectConversations,
} from "store/conversations/conversations.slice";
import { v4 as uuidv4 } from 'uuid';

export default function Conversation() {
  // Routes
  const navigate = useNavigate();
  const { conversationId } = useParams();

  // States
  const [friend, setFriend] = useState<UserDTO | null>(null);
  const [typeMessage, setTypeMessage] = useState("");
  const user: UserDTO = useSelector(selectUser);
  const conversations = useSelector(selectConversations);
  const conversation: ConversationDTO = conversations[conversationId];

  const dispatch = useDispatch();

  // Hooks
  const { message }: { message: MessageDTO } = useContext(SocketContext);

  useEffect(() => {
    if (message) {
      const messages = conversation.messages;

      if (messages && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];

        if (lastMessage.uuid === message.uuid) {
          return;
        }
      }

      dispatch(
        pushMessageConversation({
          message,
          targetId: conversationId,
        })
      );
    }
  }, [message]);

  useEffect(() => {
    userService.getOne(conversationId).then((friend) => {
      setFriend(friend);
      dispatch(initConversation({ target: friend }));
    });
  }, []);

  // Actions
  function onSubmitMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    sendMessage({ message: typeMessage, user: user, uuid: uuidv4() });

    setTypeMessage("");
  }

  return (
    friend && (
      <div className={styles["c-conversation"]}>
        <div className={styles["c-conversation__header"]}>
          <div className={styles["c-conversation__header-nav"]}>
            <p
              className={styles["c-conversation__header-nav-text"]}
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </p>
            <p className={styles["c-conversation__header-nav-text"]}>Search</p>
          </div>

          <div className={styles["c-conversation__header-body"]}>
            <h1 className={styles["c-conversation__header-body-title"]}>
              {friend.name}
            </h1>

            <div className={styles["c-conversation__header-body-actions"]}>
              <div
                className={styles["c-conversation__header-body-actions-item"]}
              >
                <CgPhone size={20} color="#ffffff" />
              </div>
              <div
                className={styles["c-conversation__header-body-actions-item"]}
              >
                <MdVideoCall size={20} color="#ffffff" />
              </div>
            </div>
          </div>

          <div className={styles["c-conversation__header--divider"]}></div>
        </div>

        <div className={styles["c-conversation__messages"]}>
          {conversation.messages.map((message, index) => {
            let lastMessage: MessageDTO;
            let nextMessage: MessageDTO;

            if (index !== 0) {
              lastMessage = conversation.messages[index - 1];
            }

            if (index !== conversation.messages.length - 1) {
              nextMessage = conversation.messages[index + 1];
            }

            return (
              <Message
                key={message.sender.id + index}
                {...message}
                receiver={user}
                lastMessage={lastMessage}
                nextMessage={nextMessage}
              />
            );
          })}
        </div>

        <form
          className={styles["c-conversation__form"]}
          onSubmit={onSubmitMessage}
        >
          <input
            className={styles["c-conversation__form-field"]}
            value={typeMessage}
            onChange={(e) => setTypeMessage(e.target.value)}
            placeholder="Type your message..."
          ></input>

          <button
            type="submit"
            className={styles["c-conversation__form-action"]}
          >
            <MdSend
              className={styles["c-conversation__form-action-icon"]}
              size={20}
              color="#FFFFFF"
            ></MdSend>
          </button>
        </form>
      </div>
    )
  );
}
