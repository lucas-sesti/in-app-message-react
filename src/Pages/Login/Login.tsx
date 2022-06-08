import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userService } from "services/user/user.service";
import { setUser } from "store/user/user.slice";
import styles from "./Login.module.scss";

export default function Login() {
  // States
  const [selectedUser, setSelectUser] = useState<string>("1");
  const dispatch = useDispatch();

  // Route
  const navigate = useNavigate();

  // Actions
  function handleChangeId(e): void {
    setSelectUser(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const user = await userService.getOne(selectedUser);

    if (user) {
      dispatch(setUser(user));
      navigate("/conversations");
    }
  }

  return (
    <form className={styles["c-login"]} onSubmit={handleSubmit}>
      <h1 className={styles["c-login__title"]}>Choose one user to login</h1>

      <div className={styles["c-login__content"]}>
        <select
          className={styles["c-login__content-select"]}
          value={selectedUser}
          onChange={handleChangeId}
        >
          <option value="1">Tannaz Sadeghi</option>
          <option value="2">John Doe</option>
        </select>

        <button className={styles["c-login__content-action"]}>Login</button>
      </div>
    </form>
  );
}
