import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { ModalProvider } from "./components/Modal/ModalProvider";
import { SocketProvider } from "./context/SocketProvider";
import SocketRestart from "./utils/SocketRestart";
import PrivateRoute from "./components/Routes/PrivateRoute";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  console.log("location", window.location);
  return (
    <Provider store={store}>
      <ModalProvider>
        <SocketProvider>
          <SocketRestart />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/chats"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </ModalProvider>
    </Provider>
  );
}

export default App;
