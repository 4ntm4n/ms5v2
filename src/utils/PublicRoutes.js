import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
    const {user} = useAuth();
    
    return !user ? <Outlet /> : <Navigate to="/groups" replace />; 
}

export default PublicRoutes;
