import { Avatar } from "Components/Avatar/Avatar";
import styles from "./FriendsSuggestions.module.scss";
import { CgSearch } from "react-icons/cg";
import { useSelector } from "react-redux";
import { selectUser } from "store/user/user.slice";
import { Link } from "react-router-dom";

export default function FriendsSuggestions() {
  // States
  const { friends } = useSelector(selectUser);

  return (
    <div className={styles["c-friends-suggestions"]}>
      <div
        className={`${styles["c-friends-suggestions__item"]} ${styles["c-friends-suggestions__item--search"]}`}
      >
        <CgSearch size={20} color="#ffffff" />
      </div>

      {friends.map((friend) => {
        return (
          <Link
            to={`/conversations/${friend.id}`}
            key={friend.id}
            className={styles["c-friends-suggestions__item"]}
          >
            <Avatar src={friend.avatar} />
          </Link>
        );
      })}
    </div>
  );
}
