import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function ProtectedRoutes() {
    const {user} = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />; 
  //"replace is a router-dom prop that replace login route in browser history."
}

export default ProtectedRoutes;
