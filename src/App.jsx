import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { ModalProvider } from "./components/Modal/ModalProvider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/chats" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
