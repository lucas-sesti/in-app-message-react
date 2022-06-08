import ReactDOM from "react-dom/client";
import "normalize.css";
import "./styles/style.scss";
import SocketProvider from "Components/Socket/Provider";
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "routes/routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <SocketProvider>
      <main>
        <AppRoutes />
      </main>
    </SocketProvider>
  </Provider>
);
