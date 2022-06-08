import { useEffect, useState } from "react";
import { initSockets } from "socket";
import SocketContext from "./Context";

export default function SocketProvider(props) {
  const [value, setValue] = useState({
    message: null,
  });

  useEffect(() => initSockets({ setValue }), []);

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
}
