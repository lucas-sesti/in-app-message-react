import Conversation from "Pages/Conversation/Conversation";
import Conversations from "Pages/Conversations/Conversations";
import Login from "Pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route
          path="/conversations/:conversationId"
          element={<Conversation />}
        />
      </Routes>
    </BrowserRouter>
  );
}
