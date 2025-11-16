import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import useSocket from "../../hooks/useWebSocket";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/slices/userSlice";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { connectSocket, connected } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          withCredentials: true,
        });
        if (res.data.authenticated) {
          dispatch(setUserProfile(res.data));
          setAuthenticated(true);
          if (!connected) {
            connectSocket();
          }
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [connected, connectSocket, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return authenticated ? children : <Navigate to="/" replace />;
}
